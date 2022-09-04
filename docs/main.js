(()=>{"use strict";function t(t,n=1,i){return new Array(4*t).fill(1).map(((t,e)=>(e+1)%4==0?n:i??Math.random()))}function n(t,n){let i=[];const e=t[0],s=t[1],r=t[2],o=t[3],a=t[4],h=t[5],c=t[6],u=t[7],L=t[8],d=t[9],G=t[10],l=t[11],f=t[12],y=t[13],m=t[14],p=t[15];let v=n[0],M=n[1],w=n[2],x=n[3];return i[0]=v*e+M*a+w*L+x*f,i[1]=v*s+M*h+w*d+x*y,i[2]=v*r+M*c+w*G+x*m,i[3]=v*o+M*u+w*l+x*p,v=n[4],M=n[5],w=n[6],x=n[7],i[4]=v*e+M*a+w*L+x*f,i[5]=v*s+M*h+w*d+x*y,i[6]=v*r+M*c+w*G+x*m,i[7]=v*o+M*u+w*l+x*p,v=n[8],M=n[9],w=n[10],x=n[11],i[8]=v*e+M*a+w*L+x*f,i[9]=v*s+M*h+w*d+x*y,i[10]=v*r+M*c+w*G+x*m,i[11]=v*o+M*u+w*l+x*p,v=n[12],M=n[13],w=n[14],x=n[15],i[12]=v*e+M*a+w*L+x*f,i[13]=v*s+M*h+w*d+x*y,i[14]=v*r+M*c+w*G+x*m,i[15]=v*o+M*u+w*l+x*p,i}const i={t:function(t,n,i,e){const s=1/Math.tan(t/2),r=1/(i-e);return[s/n,0,0,0,0,s,0,0,0,0,(i+e)*r,-1,0,0,i*e*r*2,0]},i:function(t,n,i,e,s,r){const o=1/(t-n),a=1/(i-e),h=1/(s-r);return[-2*o,0,0,0,0,-2*a,0,0,0,0,2*h,0,(t+n)*o,(e+i)*a,(r+s)*h,1]},o:function(t){let i=t[0];for(let e=1;e<t.length;e++)i=n(i,t[e]);return i},h:function(t,n,i){return[t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1]},u:function(t){const n=Math.cos(t),i=Math.sin(t);return[n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1]},L:function(t){const n=Math.cos(t),i=Math.sin(t);return[1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1]},G:function(t){const n=Math.cos(t),i=Math.sin(t);return[n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1]},l:function(t,n,i){return[1,0,0,0,0,1,0,0,0,0,1,0,t,n,i,1]}},e={perspective:function(t,n,i,e){var s=Math.tan(.5*Math.PI-.5*t),r=1/(i-e);return[s/n,0,0,0,0,s,0,0,0,0,(i+e)*r,-1,0,0,i*e*r*2,0]},m:function(t,n,i){return[2/t,0,0,0,0,-2/n,0,0,0,0,2/i,0,-1,1,0,1]},multiply:function(t,n){var i=t[0],e=t[1],s=t[2],r=t[3],o=t[4],a=t[5],h=t[6],c=t[7],u=t[8],L=t[9],d=t[10],G=t[11],l=t[12],f=t[13],y=t[14],m=t[15],p=n[0],v=n[1],M=n[2],w=n[3],x=n[4],g=n[5],z=n[6],A=n[7],b=n[8],k=n[9],S=n[10],C=n[11],j=n[12],F=n[13],R=n[14],B=n[15];return[p*i+v*o+M*u+w*l,p*e+v*a+M*L+w*f,p*s+v*h+M*d+w*y,p*r+v*c+M*G+w*m,x*i+g*o+z*u+A*l,x*e+g*a+z*L+A*f,x*s+g*h+z*d+A*y,x*r+g*c+z*G+A*m,b*i+k*o+S*u+C*l,b*e+k*a+S*L+C*f,b*s+k*h+S*d+C*y,b*r+k*c+S*G+C*m,j*i+F*o+R*u+B*l,j*e+F*a+R*L+B*f,j*s+F*h+R*d+B*y,j*r+F*c+R*G+B*m]},p:function(t,n,i){return[1,0,0,0,0,1,0,0,0,0,1,0,t,n,i,1]},v:function(t){var n=Math.cos(t),i=Math.sin(t);return[1,0,0,0,0,n,i,0,0,-i,n,0,0,0,0,1]},M:function(t){var n=Math.cos(t),i=Math.sin(t);return[n,0,-i,0,0,1,0,0,i,0,n,0,0,0,0,1]},g:function(t){var n=Math.cos(t),i=Math.sin(t);return[n,i,0,0,-i,n,0,0,0,0,1,0,0,0,0,1]},A:function(t,n,i){return[t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1]},translate:function(t,n,i,s){return e.multiply(t,e.p(n,i,s))},k:function(t,n){return e.multiply(t,e.v(n))},S:function(t,n){return e.multiply(t,e.M(n))},C:function(t,n){return e.multiply(t,e.g(n))},scale:function(t,n,i,s){return e.multiply(t,e.A(n,i,s))},inverse:function(t){var n=t[0],i=t[1],e=t[2],s=t[3],r=t[4],o=t[5],a=t[6],h=t[7],c=t[8],u=t[9],L=t[10],d=t[11],G=t[12],l=t[13],f=t[14],y=t[15],m=L*y,p=f*d,v=a*y,M=f*h,w=a*d,x=L*h,g=e*y,z=f*s,A=e*d,b=L*s,k=e*h,S=a*s,C=c*l,j=G*u,F=r*l,R=G*o,B=r*u,O=c*o,P=n*l,U=G*i,E=n*u,V=c*i,$=n*o,q=r*i,K=m*o+M*u+w*l-(p*o+v*u+x*l),N=p*i+g*u+b*l-(m*i+z*u+A*l),D=v*i+z*o+k*l-(M*i+g*o+S*l),H=x*i+A*o+S*u-(w*i+b*o+k*u),I=1/(n*K+r*N+c*D+G*H);return[I*K,I*N,I*D,I*H,I*(p*r+v*c+x*G-(m*r+M*c+w*G)),I*(m*n+z*c+A*G-(p*n+g*c+b*G)),I*(M*n+g*r+S*G-(v*n+z*r+k*G)),I*(w*n+b*r+k*c-(x*n+A*r+S*c)),I*(C*h+R*d+B*y-(j*h+F*d+O*y)),I*(j*s+P*d+V*y-(C*s+U*d+E*y)),I*(F*s+U*h+$*y-(R*s+P*h+q*y)),I*(O*s+E*h+q*d-(B*s+V*h+$*d)),I*(F*L+O*f+j*a-(B*f+C*a+R*L)),I*(E*f+C*e+U*L-(P*L+V*f+j*e)),I*(P*a+q*f+R*e-($*f+F*e+U*a)),I*($*L+B*e+V*a-(E*a+q*L+O*e))]},j:function(t,n){for(var i=[],e=0;e<4;++e){i[e]=0;for(var s=0;s<4;++s)i[e]+=n[s]*t[4*s+e]}return i}};class s{name;F;constructor(t,n,i){this.name=t;const e=this.R(GL.VERTEX_SHADER,n),s=this.R(GL.FRAGMENT_SHADER,i);this.createProgram(e,s)}R(t,n){const i=GL.createShader(t);GL.shaderSource(i,n),GL.compileShader(i);let e=GL.getShaderInfoLog(i);if(e)throw new Error(`Shader ${this.name} compile error: ${e}`);return i}createProgram(t,n){return this.F=GL.createProgram(),GL.attachShader(this.F,t),GL.attachShader(this.F,n),GL.linkProgram(this.F),this.F}}class r{canvas;B;O=new Map;m;constructor(){this.init()}init(){this.canvas=document.querySelector("#c"),GL=this.B=this.canvas.getContext("webgl2"),GL.enable(GL.DEPTH_TEST),this.resize(),addEventListener("resize",this.resize.bind(this)),this.P(),this.U()}U(){const t=.5*Math.PI/2,n=this.B.canvas.width/this.B.canvas.height;this.m=i.t(t,n,.01,500)}V(t,n,i){const e=new s(t,n,i);return this.O.set(e.name,e),e}resize(){const{innerWidth:t,innerHeight:n}=window;GL.canvas.width=t,GL.canvas.height=n,GL.viewport(0,0,t,n),console.log("resize"),GL.enable(GL.BLEND),GL.blendFunc(GL.SRC_ALPHA,GL.ONE_MINUS_SRC_ALPHA),function(t,n){n=n||1;const i=t.clientWidth*n|0,e=t.clientHeight*n|0;(t.width!==i||t.height!==e)&&(t.width=i,t.height=e)}(this.canvas,1),this.U()}P(){GL.clearColor(.796,.953,.941,1),GL.clear(GL.COLOR_BUFFER_BIT)}$(t){this.P(),t.forEach((t=>{t.$()}))}q(t){return this.O.get(t)}}const o={get K(){return{x:0,y:0,z:0}},get N(){return{x:1,y:1,z:1}},get random(){return{x:Math.random(),y:Math.random(),z:Math.random()}}};class a{D;name;H;I;position;origin;scale;rotation;constructor(t,n){this.name=n.name,this.H=t,this.position=n.position??o.K,this.scale=n.scale??o.N,this.origin=n.origin??o.K,this.rotation=n.rotation??o.K,n.D&&this.T(n.D),n.I&&(this.I=n.I.bind(this))}T(t){this.D=t,this.D.W(this)}update(t){this.D?.update(t),this.I&&this.I(t)}$(){this.D&&this.D.$(this.position)}X(){}moveBy(t=0,n=0,i=0){this.position.x+=t,this.position.y+=n,this.position.z+=i}Y(t,n=t,i=t){const e=this.scale;e.x=e.x+t,e.y=e.y+n,e.z=e.z+i}Z(t,n,i){const e=this.rotation;e.x=e.x+t,e.y=e.y+n,e.z=e.z+i}}class h{_=new Map;actions=new Map;constructor(){addEventListener("keydown",(t=>{this.J(t.key,!0)})),addEventListener("keyup",(t=>{this.J(t.key,!1)}))}J(t,n){this._.set(t,n)}tt(t,n){this.actions.set(t,n)}update(){[...this.actions].filter((t=>this._.get(t[0]))).forEach((t=>{t[1]()}))}}class c{nt;it;et;st=new Map;rt;ot;ht;ct;H;position=o.K;ut;Lt;dt;constructor(t){this.nt=new Float32Array(t.nt??[]),this.it=new Uint8Array(t.it??[]),this.et=new Float32Array(t.et??[]),this.H=t.H,this.ct=this.H.Gt.q(t.lt),this.init()}init(){this.ot=GL.createBuffer(),this.rt=GL.createBuffer(),this.ht=GL.createBuffer(),GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER,this.rt),GL.bufferData(GL.ELEMENT_ARRAY_BUFFER,this.it,GL.STATIC_DRAW),GL.bindBuffer(GL.ARRAY_BUFFER,this.ot),GL.bufferData(GL.ARRAY_BUFFER,this.nt,GL.STATIC_DRAW),GL.bindBuffer(GL.ARRAY_BUFFER,this.ht),GL.bufferData(GL.ARRAY_BUFFER,this.et,GL.STATIC_DRAW)}bind(){GL.useProgram(this.ct.F),GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER,this.rt),GL.bindBuffer(GL.ARRAY_BUFFER,this.ot),GL.vertexAttribPointer(0,3,GL.FLOAT,!1,0,0),GL.enableVertexAttribArray(0);const t=GL.getUniformLocation(this.ct.F,"uModel");GL.uniformMatrix4fv(t,!1,new Float32Array(this.Lt));const n=GL.getUniformLocation(this.ct.F,"uProjection");GL.uniformMatrix4fv(n,!1,new Float32Array(this.H.Gt.m)),GL.bindBuffer(GL.ARRAY_BUFFER,this.ht),GL.vertexAttribPointer(1,4,GL.FLOAT,!1,0,0),GL.enableVertexAttribArray(1)}update(t){const{x:n,y:e,z:s}=this.dt.scale,r=i.h(n,e,s),{x:o,y:a,z:h}=this.dt.rotation,c=i.L(o),u=i.u(a),L=i.G(h),{x:d,y:G,z:l}=this.dt.position,f=i.l(d,G,l),{x:y,y:m,z:p}=this.dt.origin,v=i.l(y,m,p),M=i.l(0,0,0);this.Lt=i.o([this.H.Gt.m,f,M,L,u,c,r,v])}$(t){this.position=t,this.bind(),GL.drawElements(GL.TRIANGLES,this.it.length,GL.UNSIGNED_BYTE,0)}W(t){this.dt=t}}class u extends c{constructor(n,i,e){super({H:n,lt:i,nt:[0,0,-1,.85,-0,.5,-.85,-0,.5,0,2,0],it:[0,3,1,0,1,2,1,3,2,2,3,0],et:e??t(4)})}}window.GL=void 0,console.log(e);const L=new class{Gt;ft=[];input;yt=!1;constructor(){this.Gt=new r,this.input=new h,this.update(0)}V(t,n,i){this.Gt.V(t,n,i)}update(t){this.input.update(),this.ft.forEach((n=>n?.update(t))),this.Gt.$(this.ft),this.yt||requestAnimationFrame(this.update.bind(this))}vt(t,n={}){const i=new a(this,{name:t,...n});return this.ft.push(i),i}Mt(t){this.ft=this.ft.filter((n=>n.name!==t.name)),t.X()}wt(t){t.forEach((t=>this.input.tt(t.key,t.action)))}};L.V("basicShader","#version 300 es\nprecision mediump float;\n\nin vec3 aPosition;\nin vec4 aVertexColor;\nuniform mat4 uModel;\nout vec4 vColor;\n\nvoid main() {\n  gl_Position =  uModel * vec4(aPosition,1);\n  vColor = aVertexColor;\n}\n","#version 300 es\nprecision mediump float;\nin vec4 vColor;\n\nout vec4 fragColor;\nvoid main() {\n  fragColor = vColor;\n}");const d=L.vt("player",{position:{x:0,y:-1,z:-7},D:new u(L,"basicShader")}),G=L.vt("ground",{position:{x:-50,y:-1,z:2},D:new class extends c{constructor(n,i,e){super({H:n,lt:i,nt:[0,0,0,0,1,0,1,1,0,1,0,0],it:[0,1,3,3,2,1],et:e??t(4)})}}(L,"basicShader",t(4,.2)),rotation:function(t=0,n=0,i=0){return{x:t,y:n,z:i}}((l=90,l*(Math.PI/180))),scale:{x:100,y:100,z:1e3}});var l;console.log(G);let f=[];for(let t=0;t<100;t++){let n=L.vt(`o${t}`,{D:new u(L,"basicShader"),position:{x:-2,y:-1,z:2*-t},I:function(n){this.position={x:Math.sin(n/500+t/5),y:this.position.y,z:this.position.z}}});n.scale={x:.4,y:.4,z:.4},f.push(n)}const y=.1;L.wt([{key:"ArrowRight",action:()=>{d.moveBy(y)}},{key:"ArrowLeft",action:()=>{d.moveBy(-.1)}},{key:"ArrowUp",action:()=>{d.moveBy(0,0,-.1)}},{key:"ArrowDown",action:()=>{d.moveBy(0,0,y)}},{key:"a",action:()=>{d.moveBy(0,y,0)}},{key:"z",action:()=>{d.moveBy(0,-.1,0)}},{key:"q",action:()=>{d.Z(0,.05,0)}},{key:"w",action:()=>{d.moveBy(0,0,y)}}])})();
//# sourceMappingURL=main.js.map