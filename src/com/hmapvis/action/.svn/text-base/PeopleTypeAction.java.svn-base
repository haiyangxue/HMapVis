package com.hmapvis.action;

import java.util.List;



import com.hmapvis.bean.PeopleType;
import com.opensymphony.xwork2.ActionContext;

public class PeopleTypeAction extends BaseAction {
	private static final long serialVersionUID = 1L;

	public String getAllType(){
		List<PeopleType> types =  peopletypeService.findAll();
		ActionContext.getContext().put("types",types);
		return "success";
	}
}
