var cache = {};

export default function mTpl(str, data, startSelector, endSelector, isCache) {
    var t = this,
        d = data,
        el = document.getElementById(str),
        tpl = el ? el.innerHTML : str,
        isCache = isCache != undefined ? isCache : true,
        valueArr = [],
        fn = function() {},
        htmlEncode = function(s, n) {
            if (!n) {
                s = s.replace(/>/g, '&gt;')
                    .replace(/</g, '&lt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#39;');
            }

            return s;
        },
        compileFn = function(args, strFormatTpl) {
            return new Function(propArr,
                "var mTpl_htmlEncode=" + htmlEncode.toString() +
                ";\n var s='';\n s+='" + strFormatTpl + "';\n return s");
        },
        resetChar = function(s) {
            return 'mTpl_' + s + '_mTpl';
        },
        recoverChar = function(s) {
            return s
                .replace(new RegExp(r, 'g'), '\r')
                .replace(new RegExp(n, 'g'), '\n')
                .replace(/mTpl_comment\d+;/g, function(l) {
                    var i = l.slice(12, l.length - 1);
                    return mTpl_comment[i];
                });
        },
        mTpl_comment = {
            length: 0
        },
        l = resetChar('L', tpl),
        r = resetChar('R', tpl),
        n = resetChar('N', tpl);

    if (isCache && cache[str]) {
        for (var i = 0, list = cache[str].propList, len = list.length; i < len; i++) {
            valueArr.push(d[list[i]]);
        }
        fn = cache[str].parsefn;
    } else {
        var a = startSelector,
            b = endSelector;
        if (!tpl) {
            return ''
        }
        if (!a || !b) {
            a = '<' + '%';
            b = '%' + '>';
        }
        if (!(tpl.indexOf(a) > -1 && tpl.indexOf(b) > -1)) {
            return tpl
        }

        var formatTpl = function(str, isError) {
            var N = isError ? '\n' : '';
            r = isError ? '' : r;
            n = isError ? '' : n;

            var eb = (function(s) {
                    return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1')
                })(b),
                reg = new RegExp(l + '(?:(?!' + eb + ')[\\s\\S])*' + eb + '|(\'+)', 'g');

            return tpl
                .replace(/<!--(?:(?!-->)[\s\S])*-->/g, function(l) {
                    var i = mTpl_comment.length++;
                    mTpl_comment[i] = l;
                    return 'mTpl_comment' + i + ';';
                })
                .split('\\').join('\\\\')
                .replace(/[\r]/g, r)
                .replace(/[\n]/g, n)
                .split(a).join(l)
                .replace(reg, function(l, $1) {
                    return $1 ? new Array($1.length + 1).join('\r') : l
                })
                .replace(new RegExp(l + '=(.*?)' + b, 'g'), "';" + N + " s+=mTpl_htmlEncode(String($1));" + N + " s+='")
                .replace(new RegExp(l + '\!=(.*?)' + b, 'g'), "';" + N + " s+=mTpl_htmlEncode(String($1),true);" + N + " s+='")
                .split(l).join("';" + N)
                .split(b).join(N + ' s+=\'')
                .split('\r').join('\\\'');
        };

        var p, propArr = [];
        for (p in d) {
            propArr.push(p);
            valueArr.push(d[p]);
        }

        fn = compileFn(propArr, formatTpl(str));
        isCache && (cache[str] = {
            parsefn: fn,
            propList: propArr
        });
    }

    var s;

    try {
        s = fn.apply(t, valueArr);
    } catch (e) {
        fn = compileFn(propArr, formatTpl(str, true));
        s = fn.apply(t, valueArr);
    }

    return recoverChar(s);
}