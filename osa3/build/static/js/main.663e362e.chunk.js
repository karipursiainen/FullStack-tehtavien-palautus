(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{38:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var c=n(14),r=n.n(c),u=n(3),a=n(2),i=n(4),s=n.n(i),j="http://localhost:3001/api/persons",o=function(){return s.a.get(j).then((function(e){return e.data}))},b=function(e){return s.a.post(j,e).then((function(e){return e.data}))},l=n(0),d=function(e){var t=e.message;return null===t?null:Object(l.jsx)("div",{className:"error",children:t})},h=function(e){var t=e.persons;return Object(l.jsx)("div",{children:Object(l.jsxs)("form",{onSubmit:function(e){return window.alert("Delete "+t.name+" ? EI VIEL\xc4 TOTEUTETTU!")},children:[t.name," ",t.number,Object(l.jsx)("button",{type:"submit",children:"delete"})]})})},O=function(e){return Object(l.jsxs)("div",{children:["name: ",Object(l.jsx)("input",{value:e.newname,onChange:e.onchange})]})},f=function(e){return Object(l.jsxs)("div",{children:["number: ",Object(l.jsx)("input",{value:e.newnumber,onChange:e.onchange})]})},m=function(){var e=Object(a.useState)([]),t=Object(u.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)(""),i=Object(u.a)(r,2),s=(i[0],i[1]),j=Object(a.useState)(""),m=Object(u.a)(j,2),x=m[0],p=m[1],v=Object(a.useState)(""),g=Object(u.a)(v,2),w=g[0],S=g[1],E=Object(a.useState)(""),C=Object(u.a)(E,2),T=C[0],k=C[1],y=Object(a.useState)(""),I=Object(u.a)(y,2),L=I[0],D=I[1],J=Object(a.useState)(""),N=Object(u.a)(J,2),U=(N[0],N[1],Object(a.useState)("")),A=Object(u.a)(U,2);A[0],A[1];Object(a.useEffect)((function(){o().then((function(e){c(e)}))}),[]);var B=n.filter((function(e){return!0===e.name.toLowerCase().includes(T.toLowerCase())}));return Object(l.jsxs)("div",{children:[Object(l.jsx)(d,{message:L}),Object(l.jsx)("h2",{children:"Phonebook"}),Object(l.jsx)("div",{children:Object(l.jsxs)("p",{children:["filter shown with name",Object(l.jsx)("input",{value:T,onChange:function(e){k(e.target.value)}})," "]})}),Object(l.jsx)("h2",{children:"add a new"}),Object(l.jsxs)("form",{onSubmit:function(e){n.filter((function(e){return e.name===x})).length>0?window.alert(x+" is allready added to phonebook"):(e.preventDefault(),b({name:x,number:w}).then((function(e){c(n.concat(e)),s(""),p(""),S(""),D("Added "+e.name)})))},children:[Object(l.jsx)("div",{children:Object(l.jsx)(O,{newname:x,onchange:function(e){p(e.target.value)}})}),Object(l.jsx)("div",{children:Object(l.jsx)(f,{newnumber:w,onchange:function(e){S(e.target.value)}})}),Object(l.jsx)("div",{children:Object(l.jsx)("button",{type:"submit",children:"add"})})]}),Object(l.jsx)("h2",{children:"Numbers"}),B.map((function(e){return Object(l.jsx)(h,{persons:e},e.id)}))]})};n(38);r.a.render(Object(l.jsx)(m,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.663e362e.chunk.js.map