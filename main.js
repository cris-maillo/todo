(()=>{"use strict";Math.pow(10,8);var e=36e5;function t(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function n(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}var a={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},r=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,o=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,i=/^([+-])(\d{2})(?::?(\d{2}))?$/;function l(e){var t,n={},r=e.split(a.dateTimeDelimiter);if(r.length>2)return n;if(/:/.test(r[0])?t=r[0]:(n.date=r[0],t=r[1],a.timeZoneDelimiter.test(n.date)&&(n.date=e.split(a.timeZoneDelimiter)[0],t=e.substr(n.date.length,e.length))),t){var o=a.timezone.exec(t);o?(n.time=t.replace(o[1],""),n.timezone=o[1]):n.time=t}return n}function d(e,t){var n=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+t)+"})|(\\d{2}|[+-]\\d{"+(2+t)+"})$)"),a=e.match(n);if(!a)return{year:NaN,restDateString:""};var r=a[1]?parseInt(a[1]):null,o=a[2]?parseInt(a[2]):null;return{year:null===o?r:100*o,restDateString:e.slice((a[1]||a[2]).length)}}function s(e,t){if(null===t)return new Date(NaN);var n=e.match(r);if(!n)return new Date(NaN);var a=!!n[4],o=c(n[1]),i=c(n[2])-1,l=c(n[3]),d=c(n[4]),s=c(n[5])-1;if(a)return function(e,t,n){return t>=1&&t<=53&&n>=0&&n<=6}(0,d,s)?function(e,t,n){var a=new Date(0);a.setUTCFullYear(e,0,4);var r=7*(t-1)+n+1-(a.getUTCDay()||7);return a.setUTCDate(a.getUTCDate()+r),a}(t,d,s):new Date(NaN);var u=new Date(0);return function(e,t,n){return t>=0&&t<=11&&n>=1&&n<=(f[t]||(p(e)?29:28))}(t,i,l)&&function(e,t){return t>=1&&t<=(p(e)?366:365)}(t,o)?(u.setUTCFullYear(t,i,Math.max(o,l)),u):new Date(NaN)}function c(e){return e?parseInt(e):1}function u(t){var n=t.match(o);if(!n)return NaN;var a=m(n[1]),r=m(n[2]),i=m(n[3]);return function(e,t,n){return 24===e?0===t&&0===n:n>=0&&n<60&&t>=0&&t<60&&e>=0&&e<25}(a,r,i)?a*e+6e4*r+1e3*i:NaN}function m(e){return e&&parseFloat(e.replace(",","."))||0}function g(t){if("Z"===t)return 0;var n=t.match(i);if(!n)return 0;var a="+"===n[1]?-1:1,r=parseInt(n[2]),o=n[3]&&parseInt(n[3])||0;return function(e,t){return t>=0&&t<=59}(0,o)?a*(r*e+6e4*o):NaN}var f=[31,null,31,30,31,30,31,31,30,31,30,31];function p(e){return e%400==0||e%4==0&&e%100!=0}function h(e){t(1,arguments);var n=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===n?new Date(e.getTime()):"number"==typeof e||"[object Number]"===n?new Date(e):("string"!=typeof e&&"[object String]"!==n||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn((new Error).stack)),new Date(NaN))}function v(e){t(1,arguments);var n=h(e);return n.setHours(0,0,0,0),n}function D(e,n){t(2,arguments);var a=v(e),r=v(n);return a.getTime()===r.getTime()}class N{constructor(e,t,n,a,r){this.title=e,this.dueDate=t,this.completed=n,this.assignedProject=a,this.dueToday=r}}const C=(e,t,n,a)=>{console.log("he"),!0===e?(n[t].completed=!1,n[t].classList="todoname"):(n[t].completed=!0,n[t].classList="todoname completed"),y(a,n)};function T(e,t,n){t.splice(e,1),y(n,t)}function y(e,t){localStorage.setItem("localDos",JSON.stringify(t));const n=document.getElementById("listHeading");n.removeChild(n.lastChild);let a=document.createElement("h2");a.innerHTML=e,n.appendChild(a);const r=document.getElementById("todos");for(;r.firstChild;)r.removeChild(r.lastChild);for(let n=0;n<t.length;n++)if("Inbox"==e||t[n].assignedProject==e||"Due Today"==e&&1==t[n].dueToday){let a=document.createElement("div");a.className="todo";let o=document.createElement("div");o.className="todoname",o.innerHTML=t[n].title;let i=t[n].completed;o.addEventListener("click",(function(){C(i,n,t,e)}),!1),!0===t[n].completed&&(o.classList="completed");let l=document.createElement("div");l.className="dueDate",l.innerHTML=t[n].dueDate;let d=document.createElement("img");d.src="img/trash-can.png",d.className="itemDelete",d.addEventListener("click",(function(){T(n,t,e)}),!1),d.width=25;let s=document.createElement("div");s.className="itemLeft",a.appendChild(o),s.appendChild(l),s.appendChild(d),a.appendChild(s),r.appendChild(a)}}function w(e,t){localStorage.setItem("localProjects",JSON.stringify(e));const n=document.getElementById("projectlist"),a=document.getElementById("projectSelect");for(;n.firstChild;)n.removeChild(n.lastChild);for(;a.firstChild;)a.removeChild(a.lastChild);for(let o=0;o<e.length;o++){let i=document.createElement("h1");i.innerHTML=e[o];let l=e[o];if(i.addEventListener("click",(function(){y(l,t)}),!1),n.appendChild(i),"Due Today"!=e[o]){var r=document.createElement("option");r.textContent=e[o],r.value=e[o],a.appendChild(r)}}}var b,E;!function(){null==localStorage.getItem("localProjects")||null==localStorage.getItem("localDos")?(E=[{title:"Look Pretty",dueDate:"2022-07-21",completed:!1,assignedProject:"Inbox",dueToday:!1},{title:"Finish To Do App",dueDate:"2022-07-21",completed:!1,assignedProject:"Coding",dueToday:!1},{title:"Have Fun",dueDate:"2022-07-21",completed:!1,assignedProject:"Inbox",dueToday:!1}],b=["Inbox","Due Today","Coding"]):(E=JSON.parse(localStorage.getItem("localDos")),b=JSON.parse(localStorage.getItem("localProjects")));let e=b[0];const a=document.getElementById("addform"),r=document.getElementById("addprojectform");r.addEventListener("submit",(e=>{e.preventDefault();let t=r.elements.project.value;b.push(t),w(b,E)})),a.addEventListener("submit",(r=>{r.preventDefault();let o,i=a.elements.title.value,c=a.elements.dueDate.value,m=a.elements.project.value;const f=function(e,a){var r;t(1,arguments);var o=n(null!==(r=null==a?void 0:a.additionalDigits)&&void 0!==r?r:2);if(2!==o&&1!==o&&0!==o)throw new RangeError("additionalDigits must be 0, 1 or 2");if("string"!=typeof e&&"[object String]"!==Object.prototype.toString.call(e))return new Date(NaN);var i,c=l(e);if(c.date){var m=d(c.date,o);i=s(m.restDateString,m.year)}if(!i||isNaN(i.getTime()))return new Date(NaN);var f,p=i.getTime(),h=0;if(c.time&&(h=u(c.time),isNaN(h)))return new Date(NaN);if(!c.timezone){var v=new Date(p+h),D=new Date(0);return D.setFullYear(v.getUTCFullYear(),v.getUTCMonth(),v.getUTCDate()),D.setHours(v.getUTCHours(),v.getUTCMinutes(),v.getUTCSeconds(),v.getUTCMilliseconds()),D}return f=g(c.timezone),isNaN(f)?new Date(NaN):new Date(p+h+f)}(c);o=!!function(e){return t(1,arguments),D(e,Date.now())}(f);var p=new N(i,c,!1,m,o);E.push(p),e=m,y(e,E)})),y(e,E),w(b,E)}()})();