package com.hmapvis.action;

	import java.util.List;

	import com.hmapvis.bean.Track;
	import com.hmapvis.bean.EventType;
	import com.hmapvis.utils.TimeTrans;
    import com.opensymphony.xwork2.ActionContext;

	public class TrackAction extends BaseAction{

		private static final long serialVersionUID = 1L;

		private Track track;
		private List<Track> tracks;
		
		public Track getTrack() {
			return track;
		}

		public void setTrack(Track track) {
			this.track = track;
		}

		public List<Track> getTracks() {
			return tracks;
		}

		public void setTracks(List<Track> tracks) {
			this.tracks = tracks;
		}  

		public String fetchByname(){
			try{
				tracks = trackService.findByFeildAll("people", track.getPeople());
				if(tracks != null){
					return "success";
				}
			}catch(Exception e){
				e.printStackTrace();
			}
			return "success";
		}
		
		public String save(){
//			try{
//				//update
//				if(dynastyService.dataExistsByInt("dynasty_id", dynasty.getDynasty_id())){
//					dynastyService.update(dynasty);
//				}else{//add
//					dynastyService.add(dynasty);
//				}
//			}catch(Exception e){
//				e.printStackTrace();
//			}
			return "success";
		}
		
		public String fetchAllTrack(){
			tracks =  trackService.findAll();

			return "success";
		}
	}


