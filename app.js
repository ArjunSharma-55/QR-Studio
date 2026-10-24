(() => {
'use strict';
const $=id=>document.getElementById(id);
const labels={url:'Website URL',text:'Plain text',email:'Email',phone:'Phone',wifi:'Wi-Fi',whatsapp:'WhatsApp'};
let type='url', qr=null, payload='', logo=null, history=[];
const key='qr-studio-history-v1';
const fields=$('fields'), output=$('output'), status=$('status');
function setStatus(s,error=false){status.textContent=s;status.classList.toggle('error',error)}
function field(label,id,kind,placeholder,attrs=''){return `<label for="${id}">${label}</label><input class="field" id="${id}" type="${kind}" placeholder="${placeholder}" ${attrs}>`}
function area(label,id,placeholder){return `<label for="${id}">${label}</label><textarea class="field" id="${id}" placeholder="${placeholder}"></textarea>`}
function renderFields(){
 const html={
 url:field('Website URL','main','url','https://example.com','value="https://example.com"'),
 text:area('Your text','main','Type a message, address or any text…'),
 email:field('Email address','to','email','hello@example.com')+field('Subject (optional)','subject','text',"Let's connect")+area('Message (optional)','message','Write a short message…'),
 phone:field('Phone number','phone','tel','+91 98765 43210'),
 wifi:field('Network name (SSID)','ssid','text','Your Wi-Fi name')+field('Password','password','text','Wi-Fi password')+'<label for="security">Security</label><select class="field" id="security"><option value="WPA">WPA / WPA2</option><option value="WEP">WEP (legacy)</option><option value="nopass">Open network (no password)</option></select><label class="checkbox-line"><input id="hidden" type="checkbox"> Hidden network</label>',
 whatsapp:field('Phone number with country code','waPhone','tel','+91 9876543210')+area('Prefilled message (optional)','waMessage','Hi! I wanted to ask…')
 };
 fields.innerHTML=html[type];$('summary').textContent=labels[type];
 fields.querySelectorAll('input,textarea,select').forEach(el=>{el.addEventListener('input',live);el.addEventListener('change',live)});
}
function payloadFor(){
 const v=id=>($(id)?.value||'').trim();
 if(type==='url'){let raw=v('main');if(!raw)throw Error('Enter a website URL.');let u;try{u=new URL(raw.includes('://')?raw:'https://'+raw)}catch{throw Error('Enter a valid website URL.')}if(!['https:','http:'].includes(u.protocol)||!u.hostname.includes('.'))throw Error('Use a valid http or https website URL.');return u.href}
 if(type==='text'){if(!v('main'))throw Error('Enter some text first.');return v('main')}
 if(type==='email'){if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('to')))throw Error('Enter a valid email address.');let p=new URLSearchParams();if(v('subject'))p.set('subject',v('subject'));if(v('message'))p.set('body',v('message'));return 'mailto:'+v('to')+(p.size?'?'+p:'')}
 if(type==='phone'){let p=v('phone').replace(/[^\d+]/g,'');if(!/^\\+?\d{5,15}$/.test(p))throw Error('Enter a phone number with 5–15 digits.');return 'tel:'+p}
 if(type==='wifi'){let s=v('ssid'),sec=$('security').value,p=v('password');if(!s)throw Error('Enter your Wi-Fi network name.');if(sec!=='nopass'&&!p)throw Error('Enter a Wi-Fi password or choose Open network.');const esc=x=>x.replace(/([\\\\;,:"])/g,'\\\\$1');return `WIFI:T:${sec};S:${esc(s)};P:${sec==='nopass'?'':esc(p)};H:${$('hidden').checked?'true':'false'};;`}
 if(type==='whatsapp'){let p=v('waPhone').replace(/[^\d]/g,'');if(!/^\d{7,15}$/.test(p))throw Error('Enter a phone number with country code, 7–15 digits.');let u=new URL('https://wa.me/'+p);if(v('waMessage'))u.searchParams.set('text',v('waMessage'));return u.href}
 throw Error('Choose a content type.');
}
function opts(size,typeOut='canvas'){let c=$('fg').value;let o={width:Number(size||$('size').value),height:Number(size||$('size').value),type:typeOut,data:payload,margin:12,qrOptions:{errorCorrectionLevel:$('ec').value},dotsOptions:{color:c,type:$('dots').value},backgroundOptions:{color:$('bg').value},cornersSquareOptions:{color:c,type:$('corner').value},cornersDotOptions:{color:c,type:$('corner').value==='square'?'square':'dot'}};if(logo){o.image=logo;o.imageOptions={crossOrigin:'anonymous',margin:5,imageSize:.22,hideBackgroundDots:true}}return o}
async function generate(save=true){try{if(!window.QRCodeStyling)throw Error('QR library did not load. Connect to the internet and reload.');payload=payloadFor();qr=new QRCodeStyling(opts($('size').value));output.replaceChildren();qr.append(output);['png','svg','copy','print'].forEach(id=>$(id).disabled=false);setStatus('QR generated locally. Scan-test before sharing.');if(save)addHistory(payload,type);return true}catch(e){setStatus(e.message||'QR generation failed.',true);return false}}
function live(){try{payload=payloadFor();if(window.QRCodeStyling)generate(false)}catch(e){setStatus(e.message,true)}}
function saveHistory(){try{localStorage.setItem(key,JSON.stringify(history))}catch{setStatus('QR generated, but local history storage is unavailable.',true)}}
function addHistory(data,t){history=[{id:Date.now()+Math.random(),payload:data,type:t,label:labels[t]},...history.filter(x=>x.payload!==data)].slice(0,6);saveHistory();renderHistory()}
function renderHistory(){const box=$('history');box.replaceChildren();if(!history.length){box.textContent='Your generated codes will show up here.';return}history.forEach(item=>{const row=document.createElement('article');row.className='history-item';const thumb=document.createElement('div');thumb.className='thumb';const info=document.createElement('div');info.className='info';const title=document.createElement('b');title.textContent=item.label;const content=document.createElement('small');content.textContent=item.payload;info.append(title,content);const load=document.createElement('button');load.textContent='Load';load.onclick=()=>{type='text';document.querySelectorAll('[data-type]').forEach(b=>b.classList.toggle('active',b.dataset.type==='text'));renderFields();$('main').value=item.payload;generate(false);setStatus('Loaded saved encoded payload as plain text.')};const del=document.createElement('button');del.textContent='×';del.setAttribute('aria-label','Remove history item');del.onclick=()=>{history=history.filter(x=>x.id!==item.id);saveHistory();renderHistory()};row.append(thumb,info,load,del);box.append(row);if(window.QRCode?.toCanvas){const c=document.createElement('canvas');QRCode.toCanvas(c,item.payload,{width:44,margin:1},err=>{if(!err)thumb.append(c)})}})}
function download(blob,name){let u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1000)}
function bind(){
 document.querySelectorAll('[data-type]').forEach(b=>b.onclick=()=>{type=b.dataset.type;document.querySelectorAll('[data-type]').forEach(x=>x.classList.toggle('active',x===b));renderFields();live()});
 ['fg','bg','dots','corner','size','ec'].forEach(id=>$(id).onchange=()=>{if(qr)generate(false)});
 $('generate').onclick=()=>generate();
 $('png').onclick=()=>{if(qr)qr.download({name:'qr-studio-code',extension:'png'})};
 $('svg').onclick=async()=>{try{let q=new QRCodeStyling(opts($('size').value,'svg'));let blob=await q.getRawData('svg');download(blob,'qr-studio-code.svg')}catch(e){setStatus('SVG export failed: '+e.message,true)}};
 $('copy').onclick=async()=>{try{await navigator.clipboard.writeText(payload);setStatus('Encoded content copied.')}catch{setStatus('Clipboard permission denied by browser.',true)}};
 $('print').onclick=()=>{let canvas=output.querySelector('canvas');if(!canvas){setStatus('Generate a QR code before printing.',true);return}let w=window.open('','_blank');if(!w){setStatus('Allow pop-ups to print.',true);return}w.document.write('<title>QR Studio print</title><img style="max-width:90vw" src="'+canvas.toDataURL()+'"><p>'+payload.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))+'</p><button onclick="print()">Print</button>');w.document.close()};
 $('reset').onclick=()=>{type='url';logo=null;$('logo').value='';$('clearLogo').hidden=true;$('fg').value='#151a35';$('bg').value='#ffffff';$('dots').value='rounded';$('corner').value='extra-rounded';$('size').value='512';$('ec').value='M';document.querySelectorAll('[data-type]').forEach(b=>b.classList.toggle('active',b.dataset.type==='url'));renderFields();qr=null;payload='';output.innerHTML='<div class="empty">⌗<b>Your QR appears here</b><small>Enter content to generate a scannable code.</small></div>';['png','svg','copy','print'].forEach(id=>$(id).disabled=true);setStatus('Settings reset.')};
 $('clearHistory').onclick=()=>{history=[];saveHistory();renderHistory();setStatus('Local history cleared.')};
 $('logo').onchange=e=>{const f=e.target.files?.[0];if(!f)return;if(!['image/png','image/jpeg','image/webp'].includes(f.type)||f.size>2*1024*1024){setStatus('Choose PNG, JPEG or WebP under 2 MB.',true);e.target.value='';return}const r=new FileReader();r.onload=()=>{logo=r.result;$('clearLogo').hidden=false;if(qr)generate(false);else setStatus('Logo ready. Generate a code to preview it.')};r.onerror=()=>setStatus('Could not read logo file.',true);r.readAsDataURL(f)};
 $('clearLogo').onclick=()=>{logo=null;$('logo').value='';$('clearLogo').hidden=true;if(qr)generate(false)};
}
function init(){bind();renderFields();try{const x=JSON.parse(localStorage.getItem(key)||'[]');history=Array.isArray(x)?x.filter(a=>a&&typeof a.payload==='string'&&labels[a.type]).slice(0,6):[]}catch{history=[]}renderHistory()}
document.addEventListener('DOMContentLoaded',init);
})();