package com.hmapvis.utils;

import java.util.ArrayList;
import java.util.List;

public class PageBean<T> {

	
	private int pageSize;//每页显示记录数
	private int pageCurrent;//当前显示的页面
	private int pageCount;//总共的页数
	private int recordCount;//总共的记录数
	private List<T> records = new ArrayList<T>(pageSize);

	/* 在html页面中，最多显示的页码数，默认为6个 */
	private int pageShow = 6;
	/**
	 * 在html页面上显示的起始页码和尾页码，如果最大一次显示pageShow个页码，并且要求当
	 * 前页码（pageCurrent）要在中间显示。
	 */
	private int begin;
	private int end;

	public PageBean() {
	}

	public PageBean(int pageCurrent, int pageCount, int recordCount,
			List<T> records, int pageShow, int begin, int end) {
		this.pageCurrent = pageCurrent;
		this.pageCount = pageCount;
		this.recordCount = recordCount;
		this.records = records;
		this.pageShow = pageShow;
		this.begin = begin;
		this.end = end;
	}
    public PageBean(int pageCurrent,int pageSize){
    	
    	this.pageCurrent = pageCurrent;
		this.pageSize = pageSize;
    }



	/**
	 * 该构造方法自动执行了initBeginAndEnd()和initPageCount()的初始化操作，调用该构造方法可以减少很多工作
	 * 
	 * @param pageCurrent
	 * @param recordCount
	 * @param records
	 */
	public PageBean(int pageCurrent, int recordCount, List<T> records) {
		this.pageCurrent = pageCurrent;
		this.recordCount = recordCount;
		this.records = records;
		pageCount = (recordCount % pageSize == 0) ? (recordCount / pageSize)
				: (recordCount / pageSize + 1);
		initBeginAndEnd();
	}

	/**
	 * 为了方便，提供此方法一起执行initPageCount()和initBeginAndEnd()方法， 对必要数据进行初始化
	 */
	public void init() {
		initPageCount();
		initBeginAndEnd();
	}

	/**
	 * 在具备了pageCount和pageShow的前提下，计算begin和end。 也就是说此方法一定要在initPageCount之后执行
	 */
	public void initBeginAndEnd() {

		if (pageCount <= pageShow) {//如果总页数不足pageShow，则全部显示
			begin = 1;
			end = pageCount;
		} else if (pageShow % 2 == 0) {// pageShow是偶数，则pageCurrent要在中间偏前一个位置
			if (pageCurrent <= pageShow / 2) {//显示前pageShow条
				begin = 1;
				end = pageShow;
			} else if (pageCount - pageCurrent < pageShow / 2) {//显示后pageShow条
				end = pageCount;
				begin = pageCount - pageShow + 1;
			} else {//显示附近前后一共pageShow条
				begin = pageCurrent - pageShow / 2 + 1;
				end = pageCurrent + pageShow / 2;
			}
		} else {// pageShow是奇数，则pageCurrent要在正中间。后面的计算方法同上。
			if (pageCurrent <= pageShow / 2 + 1) {
				begin = 1;
				end = pageShow;
			} else if (pageCount - pageCurrent < pageShow / 2) {
				end = pageCount;
				begin = pageCount - pageShow + 1;
			} else {
				begin = pageCurrent - pageShow / 2;
				end = pageCurrent + pageShow / 2;
			}
		}
	}

	/**
	 * 在具备了recordCount和pageSize的前提下，计算pageCount的值
	 */
	private void initPageCount() {
		pageCount = (recordCount % pageSize == 0) ? (recordCount / pageSize)
				: (recordCount / pageSize + 1);
	}

	// --------------------------------------------

	public int getPageCurrent() {
		return pageCurrent;
	}

	public void setPageCurrent(int pageCurrent) {
		this.pageCurrent = pageCurrent;
	}

	public int getPageCount() {
		return pageCount;
	}

	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
	}

	public int getRecordCount() {
		return recordCount;
	}

	public void setRecordCount(int recordCount) {
		this.recordCount = recordCount;
	}

	public List<T> getRecords() {
		return records;
	}

	public void setRecords(List<T> records) {
		this.records = records;
	}

	public int getBegin() {
		return begin;
	}

	public void setBegin(int begin) {
		this.begin = begin;
	}

	public int getEnd() {
		return end;
	}

	public void setEnd(int end) {
		this.end = end;
	}

	public int getPageShow() {
		return pageShow;
	}

	public void setPageShow(int pageShow) {
		this.pageShow = pageShow;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

}
