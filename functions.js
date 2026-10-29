(function(){
var pages=[].slice.call(document.querySelectorAll('.page')),cur=0;
var dots=document.getElementById('dots');
pages.forEach(function(){var d=document.createElement('div');d.className='dot';dots.appendChild(d)});
function go(n){
 if(n<0||n>=pages.length)return;
 var dir=n>cur?'fn':'fp';
 pages[cur].classList.remove('show','fn','fp');
 cur=n;
 pages[cur].classList.add('show',dir);
 [].forEach.call(dots.children,function(d,i){d.classList.toggle('on',i===cur)});
 document.getElementById('prev').disabled=cur===0;
 document.getElementById('next').disabled=cur===pages.length-1;
 window.scrollTo(0,0);
}
document.getElementById('prev').onclick=function(){go(cur-1)};
document.getElementById('next').onclick=function(){go(cur+1)};
document.addEventListener('keydown',function(e){if(e.key==='ArrowRight')go(cur+1);if(e.key==='ArrowLeft')go(cur-1)});
var sx=null;
document.getElementById('book').addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});
document.getElementById('book').addEventListener('touchend',function(e){if(sx===null)return;var dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>60)go(dx<0?cur+1:cur-1);sx=null});

var ben={
'Relaksasi':'Pijat, aroma, dan air hangat menurunkan ketegangan sehingga tubuh dan pikiran lebih tenang.',
'Peredaran darah':'Pemijatan dan air hangat membantu melancarkan aliran darah ke seluruh tubuh.',
'Kulit halus':'Lulur mengangkat sel kulit mati sehingga kulit tampak lebih halus dan cerah.',
'Kelembapan':'Masker dan pelembap menjaga kulit tidak kering dan tetap kenyal.',
'Kurangi stres':'Aromaterapi dan suasana tenang membantu menurunkan stres dan memperbaiki suasana hati.'};
var chips=document.getElementById('chips'),info=document.getElementById('info');
Object.keys(ben).forEach(function(k){
 var b=document.createElement('button');b.className='chip';b.textContent=k;
 b.onclick=function(){[].forEach.call(chips.children,function(c){c.classList.remove('on')});b.classList.add('on');info.textContent=ben[k];info.className=''};
 chips.appendChild(b);
});

var Q=[
{q:'Istilah Sanitas Per Aqua pada spa berarti ...',o:['Cantik melalui bunga','Sehat melalui air','Segar melalui aroma'],a:1},
{q:'Perawatan yang bertujuan mengangkat sel kulit mati adalah ...',o:['Body scrub (lulur)','Aromaterapi','Hidroterapi'],a:0},
{q:'Hal yang harus dilakukan sebelum memakai bahan pada klien adalah ...',o:['Langsung memijat','Menanyakan alergi dan keluhan','Menunggu klien tertidur'],a:1},
{q:'Usapan panjang dan lembut searah aliran darah disebut ...',o:['Effleurage','Tapotement','Petrissage'],a:0},
{q:'Gerakan menepuk atau mengetuk ringan disebut ...',o:['Friction','Effleurage','Tapotement'],a:2},
{q:'Minyak esensial yang dikenal menenangkan dan membantu relaksasi adalah ...',o:['Lavender','Peppermint','Lemongrass'],a:0},
{q:'Kondisi klien yang membuat perawatan spa harus ditunda adalah ...',o:['Klien merasa rileks','Klien sudah makan ringan','Klien demam atau kulit terluka'],a:2},
{q:'Urutan yang tepat adalah ...',o:['Konsultasi, pijat, lulur','Lulur, konsultasi, pijat','Pijat, masker, konsultasi'],a:0},
{q:'Spa yang mengharuskan klien menginap dalam program kesehatan disebut ...',o:['Day spa','Destination spa','Mobile spa'],a:1},
{q:'Saran yang tepat untuk klien setelah perawatan adalah ...',o:['Minum air putih yang cukup','Langsung berjemur lama','Mandi air sangat panas'],a:0}
];
var quiz=document.getElementById('quiz'),score=document.getElementById('score'),pts=0,done=0;
Q.forEach(function(it,i){
 var w=document.createElement('div');w.className='q';
 var p=document.createElement('p');p.innerHTML='<strong>'+(i+1)+'. '+it.q+'</strong>';w.appendChild(p);
 var bs=[];
 it.o.forEach(function(t,j){
  var b=document.createElement('button');b.className='opt';b.textContent=t;
  b.onclick=function(){
   if(w.dataset.d)return;w.dataset.d=1;done++;
   if(j===it.a){b.classList.add('ok');pts++}else{b.classList.add('bad');bs[it.a].classList.add('ok')}
   if(done===Q.length)score.textContent='Skor kamu: '+pts+' dari '+Q.length+(pts===Q.length?'. Hebat!':'. Coba ulangi materinya ya.');
  };
  bs.push(b);w.appendChild(b);
 });
 quiz.appendChild(w);
});
pages.forEach(function(p,i){var t=p.querySelector('.tag');if(i>0&&t)t.textContent='Halaman '+(i+1)});
var oils={
'Lavender':'Beraroma lembut dan bunga, dikenal menenangkan serta membantu relaksasi dan tidur.',
'Peppermint':'Beraroma segar dan dingin, dipakai untuk menyegarkan dan memberi sensasi sejuk.',
'Lemongrass':'Beraroma segar seperti sereh, sering dipakai untuk menyegarkan suasana dan tubuh.',
'Ylang-ylang':'Beraroma manis dan floral, dipakai untuk suasana tenang dan romantis.',
'Jeruk':'Beraroma citrus yang ceria, dipakai untuk menaikkan suasana hati. Hindari paparan matahari langsung setelah dioles karena sebagian minyak citrus dapat membuat kulit lebih sensitif.'};
var oc=document.getElementById('oilchips'),oi=document.getElementById('oilinfo');
Object.keys(oils).forEach(function(k){var b=document.createElement('button');b.className='chip';b.textContent=k;b.onclick=function(){[].forEach.call(oc.children,function(c){c.classList.remove('on')});b.classList.add('on');oi.textContent=oils[k];oi.className=''};oc.appendChild(b)});
go(0);
})();
