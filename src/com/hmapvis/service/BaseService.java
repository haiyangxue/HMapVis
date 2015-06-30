package com.hmapvis.service;

import java.io.Serializable;
import java.util.List;
import java.util.Set;
import java.util.Map.Entry;

import com.hmapvis.bean.Event;
import com.hmapvis.utils.PageBean;

/**
 * @param <T> 实体
 * @param <PK> 主键
 */
public interface BaseService<T,PK extends Serializable>{
	
	/**
	 * 根据id批量查询
	 * @param entityIds
	 * @return
	 */
	public List<T> findByFeildAll(String feildName,String feildValue);
	public List<T> findByIds(PK[] entityIds);
	public T findById(PK entityId) ;
	int findNum();
	public T loadById(PK entityId);
	/**
	 * 通过某一个字段来判断数据库中是否已经存在了指定数据.
	 * @param feildName 字段名字,如prime
	 * @param feildValue 字段值,如"计算机类"
	 * @return 存在返回true,否则返回false.
	 */
	public boolean dataExists(String feildName,String feildValue);
	
	/**
	 * 通过某一个字段来判断数据库中是否已经存在了指定数据.
	 * @param feildName 字段名字,如id
	 * @param feildValue 字段值,如1
	 * @return 存在返回true,否则返回false.
	 */
	public boolean dataExistsByInt(String feildName,int feildValue);
	public boolean datasExistsByInt(String feildName1,int feildValue1, String fieldName2,int feildValue2);
	public boolean datasExists(String feildName1,String feildValue1, String fieldName2,int feildValue2);
	/**
	 * 查询某个条件记录的个数
	 * @param feildName
	 * @param feildValue
	 * @return
	 */
	public Long getCount(String feildName,String feildValue);
	public Long getCountByInt(String feildName,int feildValue);
	/**
	 * 通过某一个字段来判断数据库中是否已经存在了指定数据.
	 * @param feildName 字段名字,如prime
	 * @param feildValue 字段值,如"计算机类"
	 * @return 存在返回存在的对象,否则返回null.注意，返回值只可能有一个，如果有多个对象具有相同的feildValue值，就会出错。
	 */
	public List<T> findsetByFeild(String feildName, String feildValue);
	/**
	 * 通过某一个字段来判断数据库中是否已经存在了指定数据.
	 * @param feildName 字段名字,如prime
	 * @param feildValue 字段值,如1
	 * @return 存在返回存在的对象,否则返回null.注意，返回值只可能有一个，如果有多个对象具有相同的feildValue值，就会出错。
	 */
	public List<T> findsetByFeildByInt(String feildName, int feildValue);
	/*
	 * 通过两个字段来找数据
	 * */
	public List<T> findByTwoFeildByInt(String feildName1, int feildValue1, String feildName2, int feildValue2);
	public List<T> findByTwoFeild(String feildName1, int feildValue1, String feildName2, String feildValue2);
	public T findOneByTwoFeildByInt(String feildName1, int feildValue1, String feildName2, int feildValue2);
	public T findOneByTwoFeild(String feildName1, int feildValue1, String feildName2, String feildValue2);
	/*
	 * 支持模糊查询，返回对象集
	 * */
	public List<T> query_vague(String feildName, String feildValue);
	/*
	 * 按照属性值（String类型）查找实体
	 * */
	public T findByFeild(String feildName,String feildValue);
	
	
	public List<T> findByTime(long time, String start_time, String end_time);
	public List<T> findByTimeRange(long time1, String start_time, long time2, int count_num);
	/*
	 * 按照属性值（int类型）查找实体
	 * */
	public T findByFeildByInt(String feildName, int feildValue);
	/*
	 * 按照属性值（int类型）查找实体列表
	 * */
	public List<T> findListByFeildByInt(String feildName, int feildValue);
	/*
	 * 查找所有
	 * */
	public List<T> findAll();
	
	//查找所有feildName==value的元组列表
	public List<T> findAllById(String feildName , int value) ;
	
	public int numInTable();
	/**
	 * 查询全部数据并有排序条件。
	 * @param orderFeild
	 * @param orderWay
	 * @return
	 */
	public List<T> findAll(String orderFeild , String orderWay);
	public void add(T entity);
	public void update(T entity);
	public void delete(T entity);
	
	/**
	 * 删除集合中的所有数据。
	 * @param entitys
	 */
	public void deleteAll(Set<T> entitys);
	
	/**
	 * 分页，无查询条件和排序条件
	 * @param pageCurrent
	 * @return 没有记录就会返回空的PageBean对象
	 */
	public PageBean<T> findByPage(int pageCurrent, int pageSize);
	/**
	 * 分页，无查询条件，有序
	 * @param pageCurrent
	 * @param orders
	 * @return 没有记录就会返回空的PageBean对象
	 */
	public PageBean<T> findByPage(int pageCurrent,int pageSize, List<Entry<String, String>> orders);
	/**
	 * 分页，有查询条件，默认按ID主键倒序排序。
	 * @param pageCurrent
	 * @param wheres
	 * @return 没有记录就会返回空的PageBean对象
	 */
	public PageBean<T> findByPage(int pageCurrent, int pageSize, List<String> wheres, List<Object> whereParams);
	
	/**
	 * 详细通用分页
	 * @param pageCurrent
	 *            当前页码
	 * @param wheres
	 *            查询条件
	 * @param orders
	 *            查询排序
	 * @param whereParams
	 *            where子句的查询参数值
	 * @param isAnd 判断是否是与条件
	 * 
	 * @return 没有记录就会返回空的PageBean对象
	 */
	public PageBean<T> findByPage(int pageCurrent, int pageSize, List<String> wheres, List<Object> whereParams,
			List<Entry<String, String>> orders,boolean isAnd);
	
	/**
	 * 重载通用分页方法，默认为与条件查询。
	 */
	public PageBean<T> findByPage(int pageCurrent, int pageSize, List<String> wheres, List<Object> whereParams,
			List<Entry<String, String>> orders) ;
	/**
	 * 根据传入的HQL语句进行分页查询。
	 */
	public PageBean<T> findByPage(int pageCurrent, int pageSize, String hql);
	
	public PageBean<T> findByPage(int pageCurrent, int pageSize, String feildName, String feildValue);
	public List<Event> getAllEventsData();
	public List<Event> getDataByDynastyId(int dynasty_id);
	public int getMaxIdofPlace();
	
	public List<T> searchByHql(String hql);
	public String findDynatynameById(int dynasty_id);
	public List<Event> getDataByYearRange(String start_year, String end_year);
}
