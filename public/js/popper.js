!function(e,t){for(var n in t)e[n]=t[n]}(window,function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=200)}({200:function(e,t,n){"use strict";n.r(t);var r=n(5),o=n.n(r);n.d(t,"Popper",(function(){return o.a}))},5:function(e,t,n){!function(e){"use strict";function t(e){if(null==e)return window;if("[object Window]"!==e.toString()){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function n(e){return e instanceof t(e).Element||e instanceof Element}function r(e){return e instanceof t(e).HTMLElement||e instanceof HTMLElement}function o(e){return"undefined"!=typeof ShadowRoot&&(e instanceof t(e).ShadowRoot||e instanceof ShadowRoot)}var i=Math.max,a=Math.min,s=Math.round;function f(e,t){void 0===t&&(t=!1);var n=e.getBoundingClientRect(),o=1,i=1;if(r(e)&&t){var a=e.offsetHeight,f=e.offsetWidth;f>0&&(o=s(n.width)/f||1),a>0&&(i=s(n.height)/a||1)}return{width:n.width/o,height:n.height/i,top:n.top/i,right:n.right/o,bottom:n.bottom/i,left:n.left/o,x:n.left/o,y:n.top/i}}function c(e){var n=t(e);return{scrollLeft:n.pageXOffset,scrollTop:n.pageYOffset}}function u(e){return e?(e.nodeName||"").toLowerCase():null}function p(e){return((n(e)?e.ownerDocument:e.document)||window.document).documentElement}function l(e){return f(p(e)).left+c(e).scrollLeft}function d(e){return t(e).getComputedStyle(e)}function m(e){var t=d(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function h(e,n,o){void 0===o&&(o=!1);var i,a,d=r(n),h=r(n)&&function(e){var t=e.getBoundingClientRect(),n=s(t.width)/e.offsetWidth||1,r=s(t.height)/e.offsetHeight||1;return 1!==n||1!==r}(n),v=p(n),y=f(e,h),g={scrollLeft:0,scrollTop:0},b={x:0,y:0};return(d||!d&&!o)&&(("body"!==u(n)||m(v))&&(g=(i=n)!==t(i)&&r(i)?{scrollLeft:(a=i).scrollLeft,scrollTop:a.scrollTop}:c(i)),r(n)?((b=f(n,!0)).x+=n.clientLeft,b.y+=n.clientTop):v&&(b.x=l(v))),{x:y.left+g.scrollLeft-b.x,y:y.top+g.scrollTop-b.y,width:y.width,height:y.height}}function v(e){var t=f(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function y(e){return"html"===u(e)?e:e.assignedSlot||e.parentNode||(o(e)?e.host:null)||p(e)}function g(e){return["html","body","#document"].indexOf(u(e))>=0?e.ownerDocument.body:r(e)&&m(e)?e:g(y(e))}function b(e,n){var r;void 0===n&&(n=[]);var o=g(e),i=o===(null==(r=e.ownerDocument)?void 0:r.body),a=t(o),s=i?[a].concat(a.visualViewport||[],m(o)?o:[]):o,f=n.concat(s);return i?f:f.concat(b(y(s)))}function w(e){return["table","td","th"].indexOf(u(e))>=0}function x(e){return r(e)&&"fixed"!==d(e).position?e.offsetParent:null}function O(e){for(var n=t(e),o=x(e);o&&w(o)&&"static"===d(o).position;)o=x(o);return o&&("html"===u(o)||"body"===u(o)&&"static"===d(o).position)?n:o||function(e){var t=-1!==navigator.userAgent.toLowerCase().indexOf("firefox");if(-1!==navigator.userAgent.indexOf("Trident")&&r(e)&&"fixed"===d(e).position)return null;for(var n=y(e);r(n)&&["html","body"].indexOf(u(n))<0;){var o=d(n);if("none"!==o.transform||"none"!==o.perspective||"paint"===o.contain||-1!==["transform","perspective"].indexOf(o.willChange)||t&&"filter"===o.willChange||t&&o.filter&&"none"!==o.filter)return n;n=n.parentNode}return null}(e)||n}var j="top",E="bottom",D="right",P="left",A="auto",M=[j,E,D,P],L="start",k="end",S="viewport",W="popper",B=M.reduce((function(e,t){return e.concat([t+"-"+L,t+"-"+k])}),[]),H=[].concat(M,[A]).reduce((function(e,t){return e.concat([t,t+"-"+L,t+"-"+k])}),[]),T=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function R(e){return e.split("-")[0]}function C(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&o(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function _(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function q(e,r){return r===S?_(function(e){var n=t(e),r=p(e),o=n.visualViewport,i=r.clientWidth,a=r.clientHeight,s=0,f=0;return o&&(i=o.width,a=o.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(s=o.offsetLeft,f=o.offsetTop)),{width:i,height:a,x:s+l(e),y:f}}(e)):n(r)?function(e){var t=f(e);return t.top=t.top+e.clientTop,t.left=t.left+e.clientLeft,t.bottom=t.top+e.clientHeight,t.right=t.left+e.clientWidth,t.width=e.clientWidth,t.height=e.clientHeight,t.x=t.left,t.y=t.top,t}(r):_(function(e){var t,n=p(e),r=c(e),o=null==(t=e.ownerDocument)?void 0:t.body,a=i(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=i(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),f=-r.scrollLeft+l(e),u=-r.scrollTop;return"rtl"===d(o||n).direction&&(f+=i(n.clientWidth,o?o.clientWidth:0)-a),{width:a,height:s,x:f,y:u}}(p(e)))}function V(e,t,o){var s="clippingParents"===t?function(e){var t=b(y(e)),o=["absolute","fixed"].indexOf(d(e).position)>=0&&r(e)?O(e):e;return n(o)?t.filter((function(e){return n(e)&&C(e,o)&&"body"!==u(e)})):[]}(e):[].concat(t),f=[].concat(s,[o]),c=f[0],p=f.reduce((function(t,n){var r=q(e,n);return t.top=i(r.top,t.top),t.right=a(r.right,t.right),t.bottom=a(r.bottom,t.bottom),t.left=i(r.left,t.left),t}),q(e,c));return p.width=p.right-p.left,p.height=p.bottom-p.top,p.x=p.left,p.y=p.top,p}function N(e){return e.split("-")[1]}function I(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function F(e){var t,n=e.reference,r=e.element,o=e.placement,i=o?R(o):null,a=o?N(o):null,s=n.x+n.width/2-r.width/2,f=n.y+n.height/2-r.height/2;switch(i){case j:t={x:s,y:n.y-r.height};break;case E:t={x:s,y:n.y+n.height};break;case D:t={x:n.x+n.width,y:f};break;case P:t={x:n.x-r.width,y:f};break;default:t={x:n.x,y:n.y}}var c=i?I(i):null;if(null!=c){var u="y"===c?"height":"width";switch(a){case L:t[c]=t[c]-(n[u]/2-r[u]/2);break;case k:t[c]=t[c]+(n[u]/2-r[u]/2)}}return t}function U(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function z(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}function X(e,t){void 0===t&&(t={});var r=t,o=r.placement,i=void 0===o?e.placement:o,a=r.boundary,s=void 0===a?"clippingParents":a,c=r.rootBoundary,u=void 0===c?S:c,l=r.elementContext,d=void 0===l?W:l,m=r.altBoundary,h=void 0!==m&&m,v=r.padding,y=void 0===v?0:v,g=U("number"!=typeof y?y:z(y,M)),b=d===W?"reference":W,w=e.rects.popper,x=e.elements[h?b:d],O=V(n(x)?x:x.contextElement||p(e.elements.popper),s,u),P=f(e.elements.reference),A=F({reference:P,element:w,strategy:"absolute",placement:i}),L=_(Object.assign({},w,A)),k=d===W?L:P,B={top:O.top-k.top+g.top,bottom:k.bottom-O.bottom+g.bottom,left:O.left-k.left+g.left,right:k.right-O.right+g.right},H=e.modifiersData.offset;if(d===W&&H){var T=H[i];Object.keys(B).forEach((function(e){var t=[D,E].indexOf(e)>=0?1:-1,n=[j,E].indexOf(e)>=0?"y":"x";B[e]+=T[n]*t}))}return B}var Y={placement:"bottom",modifiers:[],strategy:"absolute"};function G(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}function J(e){void 0===e&&(e={});var t=e,r=t.defaultModifiers,o=void 0===r?[]:r,i=t.defaultOptions,a=void 0===i?Y:i;return function(e,t,r){void 0===r&&(r=a);var i,s,f={placement:"bottom",orderedModifiers:[],options:Object.assign({},Y,a),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},c=[],u=!1,p={state:f,setOptions:function(r){var i="function"==typeof r?r(f.options):r;l(),f.options=Object.assign({},a,f.options,i),f.scrollParents={reference:n(e)?b(e):e.contextElement?b(e.contextElement):[],popper:b(t)};var s,u,d=function(e){var t=function(e){var t=new Map,n=new Set,r=[];return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||function e(o){n.add(o.name),[].concat(o.requires||[],o.requiresIfExists||[]).forEach((function(r){if(!n.has(r)){var o=t.get(r);o&&e(o)}})),r.push(o)}(e)})),r}(e);return T.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}((s=[].concat(o,f.options.modifiers),u=s.reduce((function(e,t){var n=e[t.name];return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e}),{}),Object.keys(u).map((function(e){return u[e]}))));return f.orderedModifiers=d.filter((function(e){return e.enabled})),f.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,r=void 0===n?{}:n,o=e.effect;if("function"==typeof o){var i=o({state:f,name:t,instance:p,options:r});c.push(i||function(){})}})),p.update()},forceUpdate:function(){if(!u){var e=f.elements,t=e.reference,n=e.popper;if(G(t,n)){f.rects={reference:h(t,O(n),"fixed"===f.options.strategy),popper:v(n)},f.reset=!1,f.placement=f.options.placement,f.orderedModifiers.forEach((function(e){return f.modifiersData[e.name]=Object.assign({},e.data)}));for(var r=0;r<f.orderedModifiers.length;r++)if(!0!==f.reset){var o=f.orderedModifiers[r],i=o.fn,a=o.options,s=void 0===a?{}:a,c=o.name;"function"==typeof i&&(f=i({state:f,options:s,name:c,instance:p})||f)}else f.reset=!1,r=-1}}},update:(i=function(){return new Promise((function(e){p.forceUpdate(),e(f)}))},function(){return s||(s=new Promise((function(e){Promise.resolve().then((function(){s=void 0,e(i())}))}))),s}),destroy:function(){l(),u=!0}};if(!G(e,t))return p;function l(){c.forEach((function(e){return e()})),c=[]}return p.setOptions(r).then((function(e){!u&&r.onFirstUpdate&&r.onFirstUpdate(e)})),p}}var K={passive:!0},Q={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var n=e.state,r=e.instance,o=e.options,i=o.scroll,a=void 0===i||i,s=o.resize,f=void 0===s||s,c=t(n.elements.popper),u=[].concat(n.scrollParents.reference,n.scrollParents.popper);return a&&u.forEach((function(e){e.addEventListener("scroll",r.update,K)})),f&&c.addEventListener("resize",r.update,K),function(){a&&u.forEach((function(e){e.removeEventListener("scroll",r.update,K)})),f&&c.removeEventListener("resize",r.update,K)}},data:{}},Z={name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name;t.modifiersData[n]=F({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},$={top:"auto",right:"auto",bottom:"auto",left:"auto"};function ee(e){var n,r=e.popper,o=e.popperRect,i=e.placement,a=e.variation,f=e.offsets,c=e.position,u=e.gpuAcceleration,l=e.adaptive,m=e.roundOffsets,h=e.isFixed,v=f.x,y=void 0===v?0:v,g=f.y,b=void 0===g?0:g,w="function"==typeof m?m({x:y,y:b}):{x:y,y:b};y=w.x,b=w.y;var x=f.hasOwnProperty("x"),A=f.hasOwnProperty("y"),M=P,L=j,S=window;if(l){var W=O(r),B="clientHeight",H="clientWidth";W===t(r)&&"static"!==d(W=p(r)).position&&"absolute"===c&&(B="scrollHeight",H="scrollWidth"),W=W,(i===j||(i===P||i===D)&&a===k)&&(L=E,b-=(h&&S.visualViewport?S.visualViewport.height:W[B])-o.height,b*=u?1:-1),i!==P&&(i!==j&&i!==E||a!==k)||(M=D,y-=(h&&S.visualViewport?S.visualViewport.width:W[H])-o.width,y*=u?1:-1)}var T,R=Object.assign({position:c},l&&$),C=!0===m?function(e){var t=e.x,n=e.y,r=window.devicePixelRatio||1;return{x:s(t*r)/r||0,y:s(n*r)/r||0}}({x:y,y:b}):{x:y,y:b};return y=C.x,b=C.y,u?Object.assign({},R,((T={})[L]=A?"0":"",T[M]=x?"0":"",T.transform=(S.devicePixelRatio||1)<=1?"translate("+y+"px, "+b+"px)":"translate3d("+y+"px, "+b+"px, 0)",T)):Object.assign({},R,((n={})[L]=A?b+"px":"",n[M]=x?y+"px":"",n.transform="",n))}var te={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=void 0===r||r,i=n.adaptive,a=void 0===i||i,s=n.roundOffsets,f=void 0===s||s,c={placement:R(t.placement),variation:N(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:"fixed"===t.options.strategy};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,ee(Object.assign({},c,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:f})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,ee(Object.assign({},c,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:f})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}},ne={name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state;Object.keys(t.elements).forEach((function(e){var n=t.styles[e]||{},o=t.attributes[e]||{},i=t.elements[e];r(i)&&u(i)&&(Object.assign(i.style,n),Object.keys(o).forEach((function(e){var t=o[e];!1===t?i.removeAttribute(e):i.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach((function(e){var o=t.elements[e],i=t.attributes[e]||{},a=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce((function(e,t){return e[t]="",e}),{});r(o)&&u(o)&&(Object.assign(o.style,a),Object.keys(i).forEach((function(e){o.removeAttribute(e)})))}))}},requires:["computeStyles"]},re={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=void 0===o?[0,0]:o,a=H.reduce((function(e,n){return e[n]=function(e,t,n){var r=R(e),o=[P,j].indexOf(r)>=0?-1:1,i="function"==typeof n?n(Object.assign({},t,{placement:e})):n,a=i[0],s=i[1];return a=a||0,s=(s||0)*o,[P,D].indexOf(r)>=0?{x:s,y:a}:{x:a,y:s}}(n,t.rects,i),e}),{}),s=a[t.placement],f=s.x,c=s.y;null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=f,t.modifiersData.popperOffsets.y+=c),t.modifiersData[r]=a}},oe={left:"right",right:"left",bottom:"top",top:"bottom"};function ie(e){return e.replace(/left|right|bottom|top/g,(function(e){return oe[e]}))}var ae={start:"end",end:"start"};function se(e){return e.replace(/start|end/g,(function(e){return ae[e]}))}function fe(e,t){void 0===t&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,a=n.padding,s=n.flipVariations,f=n.allowedAutoPlacements,c=void 0===f?H:f,u=N(r),p=u?s?B:B.filter((function(e){return N(e)===u})):M,l=p.filter((function(e){return c.indexOf(e)>=0}));0===l.length&&(l=p);var d=l.reduce((function(t,n){return t[n]=X(e,{placement:n,boundary:o,rootBoundary:i,padding:a})[R(n)],t}),{});return Object.keys(d).sort((function(e,t){return d[e]-d[t]}))}var ce={name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=void 0===o||o,a=n.altAxis,s=void 0===a||a,f=n.fallbackPlacements,c=n.padding,u=n.boundary,p=n.rootBoundary,l=n.altBoundary,d=n.flipVariations,m=void 0===d||d,h=n.allowedAutoPlacements,v=t.options.placement,y=R(v),g=f||(y!==v&&m?function(e){if(R(e)===A)return[];var t=ie(e);return[se(e),t,se(t)]}(v):[ie(v)]),b=[v].concat(g).reduce((function(e,n){return e.concat(R(n)===A?fe(t,{placement:n,boundary:u,rootBoundary:p,padding:c,flipVariations:m,allowedAutoPlacements:h}):n)}),[]),w=t.rects.reference,x=t.rects.popper,O=new Map,M=!0,k=b[0],S=0;S<b.length;S++){var W=b[S],B=R(W),H=N(W)===L,T=[j,E].indexOf(B)>=0,C=T?"width":"height",_=X(t,{placement:W,boundary:u,rootBoundary:p,altBoundary:l,padding:c}),q=T?H?D:P:H?E:j;w[C]>x[C]&&(q=ie(q));var V=ie(q),I=[];if(i&&I.push(_[B]<=0),s&&I.push(_[q]<=0,_[V]<=0),I.every((function(e){return e}))){k=W,M=!1;break}O.set(W,I)}if(M)for(var F=function(e){var t=b.find((function(t){var n=O.get(t);if(n)return n.slice(0,e).every((function(e){return e}))}));if(t)return k=t,"break"},U=m?3:1;U>0&&"break"!==F(U);U--);t.placement!==k&&(t.modifiersData[r]._skip=!0,t.placement=k,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}};function ue(e,t,n){return i(e,a(t,n))}var pe={name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,s=void 0===o||o,f=n.altAxis,c=void 0!==f&&f,u=n.boundary,p=n.rootBoundary,l=n.altBoundary,d=n.padding,m=n.tether,h=void 0===m||m,y=n.tetherOffset,g=void 0===y?0:y,b=X(t,{boundary:u,rootBoundary:p,padding:d,altBoundary:l}),w=R(t.placement),x=N(t.placement),A=!x,M=I(w),k="x"===M?"y":"x",S=t.modifiersData.popperOffsets,W=t.rects.reference,B=t.rects.popper,H="function"==typeof g?g(Object.assign({},t.rects,{placement:t.placement})):g,T="number"==typeof H?{mainAxis:H,altAxis:H}:Object.assign({mainAxis:0,altAxis:0},H),C=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,_={x:0,y:0};if(S){if(s){var q,V="y"===M?j:P,F="y"===M?E:D,U="y"===M?"height":"width",z=S[M],Y=z+b[V],G=z-b[F],J=h?-B[U]/2:0,K=x===L?W[U]:B[U],Q=x===L?-B[U]:-W[U],Z=t.elements.arrow,$=h&&Z?v(Z):{width:0,height:0},ee=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},te=ee[V],ne=ee[F],re=ue(0,W[U],$[U]),oe=A?W[U]/2-J-re-te-T.mainAxis:K-re-te-T.mainAxis,ie=A?-W[U]/2+J+re+ne+T.mainAxis:Q+re+ne+T.mainAxis,ae=t.elements.arrow&&O(t.elements.arrow),se=ae?"y"===M?ae.clientTop||0:ae.clientLeft||0:0,fe=null!=(q=null==C?void 0:C[M])?q:0,ce=z+ie-fe,pe=ue(h?a(Y,z+oe-fe-se):Y,z,h?i(G,ce):G);S[M]=pe,_[M]=pe-z}if(c){var le,de="x"===M?j:P,me="x"===M?E:D,he=S[k],ve="y"===k?"height":"width",ye=he+b[de],ge=he-b[me],be=-1!==[j,P].indexOf(w),we=null!=(le=null==C?void 0:C[k])?le:0,xe=be?ye:he-W[ve]-B[ve]-we+T.altAxis,Oe=be?he+W[ve]+B[ve]-we-T.altAxis:ge,je=h&&be?function(e,t,n){var r=ue(e,t,n);return r>n?n:r}(xe,he,Oe):ue(h?xe:ye,he,h?Oe:ge);S[k]=je,_[k]=je-he}t.modifiersData[r]=_}},requiresIfExists:["offset"]},le={name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,a=n.modifiersData.popperOffsets,s=R(n.placement),f=I(s),c=[P,D].indexOf(s)>=0?"height":"width";if(i&&a){var u=function(e,t){return U("number"!=typeof(e="function"==typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:z(e,M))}(o.padding,n),p=v(i),l="y"===f?j:P,d="y"===f?E:D,m=n.rects.reference[c]+n.rects.reference[f]-a[f]-n.rects.popper[c],h=a[f]-n.rects.reference[f],y=O(i),g=y?"y"===f?y.clientHeight||0:y.clientWidth||0:0,b=m/2-h/2,w=u[l],x=g-p[c]-u[d],A=g/2-p[c]/2+b,L=ue(w,A,x),k=f;n.modifiersData[r]=((t={})[k]=L,t.centerOffset=L-A,t)}},effect:function(e){var t=e.state,n=e.options.element,r=void 0===n?"[data-popper-arrow]":n;null!=r&&("string"!=typeof r||(r=t.elements.popper.querySelector(r)))&&C(t.elements.popper,r)&&(t.elements.arrow=r)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function de(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function me(e){return[j,D,E,P].some((function(t){return e[t]>=0}))}var he={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,a=X(t,{elementContext:"reference"}),s=X(t,{altBoundary:!0}),f=de(a,r),c=de(s,o,i),u=me(f),p=me(c);t.modifiersData[n]={referenceClippingOffsets:f,popperEscapeOffsets:c,isReferenceHidden:u,hasPopperEscaped:p},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":p})}},ve=J({defaultModifiers:[Q,Z,te,ne]}),ye=[Q,Z,te,ne,re,ce,pe,le,he],ge=J({defaultModifiers:ye});e.applyStyles=ne,e.arrow=le,e.computeStyles=te,e.createPopper=ge,e.createPopperLite=ve,e.defaultModifiers=ye,e.detectOverflow=X,e.eventListeners=Q,e.flip=ce,e.hide=he,e.offset=re,e.popperGenerator=J,e.popperOffsets=Z,e.preventOverflow=pe,Object.defineProperty(e,"__esModule",{value:!0})}(t)}}));