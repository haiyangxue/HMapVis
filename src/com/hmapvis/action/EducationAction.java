package com.hmapvis.action;

import java.util.List;
import com.hmapvis.bean.Education;
import com.opensymphony.xwork2.ActionContext;

public class EducationAction extends BaseAction {
	private static final long serialVersionUID = 1L;

	private Education education;
	private List<Education> educations;
	
	public Education getEducation() {
		return education;
	}
	public void setEducation(Education education) {
		this.education = education;
	}
	public List<Education> getEducations() {
		return educations;
	}
	public void setEducations(List<Education> educations) {
		this.educations = educations;
	}

	public String fetch(){
		try{
			education = educationService.findByFeildByInt("education_id", education.getEducation_id());
			if(education != null){
				return "success";
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return "success";
	}
	
	public String save(){
		try{
			//update
			if(educationService.dataExistsByInt("education_id", education.getEducation_id())){
				educationService.update(education);
			}else{//add
				educationService.add(education);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return "success";
	}
	
	public String fetchAllEducation(){
		educations =  educationService.findAll();

		return "success";
	}
}
