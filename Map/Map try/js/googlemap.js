//���ǳ�ʼ����������������google��ͼ 
function init() { 
console.log("entering the init() method"); 
//���ȱ����ж�������Ƿ���geolocation���ԣ���ΪHTML5 ��������������ԣ����������������֧�� 
if (navigator.geolocation) { 
//��������֧��geolocation����ʹ��geolocation��getCurrentLocation������ȡ���û���ǰ�ĵ���λ�ã� 
//�����ڳɹ�ȡ��֮�����show_map()�ص����� 
console.log(' Browser support geolocation '); 
navigator.geolocation.getCurrentPosition(show_map,handle_error ,null); 
} else { 
console.log(' Browser doesnt support geolocation '); 
} 
 
} 
 
 
//����һ���ص����������ڵ�geolocation�ɹ�ȡ���û���������ڵĵ���λ��ʱ�����Ӧ���������е�λ����Ϣ��װ��position�� 
//�������Ǿ���Ҫ����position��ȡ���û�����ϸ��Ϣ 
function show_map(position) { 
 
// ȡ�õ�ǰ�ĵ���λ�� 
var coords = position.coords; 
  
//Part 1; ��ʾ�û��ľ�ȷλ����Ϣ 
//ȡ��ҳ����������ʾ��ȷλ����Ϣ����� 
var positionInfo=document.getElementById("positionInfo"); 
var positionString="����: "+coords.longitude+"<br>"; 
positionString+="ά��: "+coords.latitude+"<br>"; 
var altitude=coords.altitude; 
if( altitude!=null){ 
positionString+="���θ߶�"+coords.altitude+"<br>"; 
} 
positionString+="��γ�Ⱦ�ȷ����"+coords.accuracy+"��"+"<br>"; 
positionInfo.innerHTML=positionString; 
//Part 2; ��google��ͼ����ʾ������ĵ�ǰλ�� 
// �趨��ͼ���������û��ĵ�ǰλ�õ�ά�Ⱥ;��ȶ��趨Ϊ��ͼ�����ĵ� 
var latlng = new google.maps.LatLng(coords.latitude, coords.longitude); 
var myOptions = { 
// �趨�Ŵ��� 
zoom : 14, 
// ����ͼ�����ĵ��趨Ϊָ��������� 
center : latlng, 
// ָ����ͼ�����ͣ�����ѡ����ǽֵ���ͼ 
mapTypeId : google.maps.MapTypeId.ROADMAP 
}; 
// ������ͼ����"map"div����ʾ���������ͼ����map1 
var map1; 
map1 = new google.maps.Map(document.getElementById("map"), myOptions); 
// �ڵ�ͼ�ϴ������ 
var marker = new google.maps.Marker({ 
//��ע�ղŴ����ı�ע�㣬��Ϊ��ע�����ɵ�ǰ�ľ�γ���趨�ģ����Ա�ʾ�˵�ǰλ�� 
position : latlng, 
//��ע�����ŵ�ͼ�ϣ����Ǵ�����map1��Ϊgoogle map�����Ա�ע��map1�� 
map : map1 
}); 
// �趨��ע���ڣ�����ָ���ô��ڵ�ע������ 
var infowindow = new google.maps.InfoWindow({ 
content : "����Charles��������ĵ�ǰλ��!" 
}); 
// �򿪱�ע���� 
infoWindow.open(map1, marker); 
 
} 
 
 
 
//���ǵڶ����ص����������ڵ�geolocation��ȡ�û���������ڵĵ���λ��ʧ��ʱ�����Ӧ 
//error�����װ�����еĿ��ܳ��ֵ��޷���õ���λ�õĴ�����Ϣ������HTML5Ϊ��Ԥ���˴����룬����ȡֵ{1,2,3} 
function handle_error(error){ 
var errorTypes={ 
1:'λ�÷��񱻾ܾ�', 
2:'��ȡ����λ����Ϣ', 
3:'��ȡ��Ϣ��ʱ' 
}; 
console.log(errorTypes[error.code] + ":,����ȷ����ĵ�ǰ����λ��"); 
} 