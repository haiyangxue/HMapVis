var HMapVis = window.HMapVis = HMapVis || {};
(function($) {
	var BCDate = HMapVis.BCDate =function(tmpdate){
		
		var _ = {
			strdate:tmpdate,
			bc:false,
			date:null,
//			date:new Date(tmpdate),
		};
		
		this.get = function(key){
            return _[key];
        };
        
        this.set = function(key, value){
            _[key] = value;
        };
        
        this.init(tmpdate);
	};
	
	BCDate.prototype = {
			
		init:function(tmpdate){
			var me = this;
			if(tmpdate.charAt(0) == '-'){
				me.set('bc',true);
				me.set('strdate',tmpdate.substring(1));
//				me.set('date', new Date(me.get('strdate')));
			}
			
			//确保一定能生成Date(）对象，例：对其赋值23无法生成Date()对象
			var part=new Array();
			var input=me.get('strdate');
			part=input.split("/");
			while(part[0].length<4){
				part[0]="0"+part[0];
			}
			var date=new Date(part[0]);
			var month=0;
			var day=0;
			if(part[1]!=null && part[2]!=null){
				month=parseInt(part[1]);
				day=parseInt(part[2]);
				date.setMonth(month, day);
			}
			
			me.set('date', date);
		},
		
		getFullYear:function(){
			var me = this;
			if(me.get('bc')){
				return 0-me.get('date').getFullYear();
			}
			return me.get('date').getFullYear();
		},
		
		getMonth:function(){
			var me = this;
			return me.get('date').getMonth();
		},
		
		getDate:function(){
			var me = this;
			return me.get('date').getDate();
		},
		
	};
	
})(jQuery);