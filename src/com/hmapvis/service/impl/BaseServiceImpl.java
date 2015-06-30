package com.hmapvis.service.impl;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.AbstractMap.SimpleEntry;
import java.util.ArrayList;
import java.util.List;
import java.util.Map.Entry;
import java.util.Set;

import javax.annotation.Resource;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.transaction.annotation.Transactional;

import com.hmapvis.bean.Event;
import com.hmapvis.service.BaseService;
import com.hmapvis.utils.HQLHelper;
import com.hmapvis.utils.PageBean;
import com.hmapvis.utils.TimeTrans;


/**
 * 注解是可以继承的，在这里写上@transactional的注解，在其子类中即可被spring识别
 */
@Transactional
@SuppressWarnings( { "unchecked" })
public class BaseServiceImpl<T, PK extends Serializable> implements BaseService<T, PK> {
	
	
	@Resource 
	protected SessionFactory sessionFactory;
	private Class clazz = null;
	
	public BaseServiceImpl() {
		ParameterizedType genericSuperclass = (ParameterizedType) this.getClass().getGenericSuperclass();
		this.clazz = (Class) genericSuperclass.getActualTypeArguments()[0];
	}

	public void add(T entity) {
		sessionFactory.getCurrentSession().save(entity);
	}

	public void delete(T entity) {
		sessionFactory.getCurrentSession().delete(entity);
	}

	public void deleteAll(Set<T> entitys) {
		if (entitys != null && entitys.size() > 0) {
			Session session = sessionFactory.getCurrentSession();
			for (T entity : entitys) {
				session.delete(entity);
			}
		}
	}

	@Transactional(readOnly = true)
	public List<T> findAll() {
		List<T> list = (List<T>) sessionFactory.getCurrentSession().createQuery("from " + clazz.getSimpleName()).setCacheable(true).list();
		return list;
	}
	@Transactional(readOnly = true)
	public List<T> findAll(String orderFeild , String orderWay) {
		List<T> list = (List<T>) sessionFactory.getCurrentSession().createQuery("from " + clazz.getSimpleName()+" o order by o."+orderFeild+" "+orderWay).setCacheable(true).list();
		return list;
	}

	@Transactional(readOnly = true)
	public List<T> findAllById(String feildName , int value) {
		String hql = " from " + clazz.getSimpleName() + " o where o." + feildName + "=:value";
		List<T> list = (List<T>) sessionFactory.getCurrentSession().createQuery(hql).setCacheable(true).setParameter("value", value).list();
		return list;
	}
	
	@Override
	public List<Event> getAllEventsData() {
		List<Event> list = (List<Event>) sessionFactory.getCurrentSession().createQuery("from Event").setCacheable(true).list();
		return list;
	}
	@Override
	public List<Event> getDataByDynastyId(int dynasty_id) {
		String hql ="from Event o where o.dynasty_id=:dynasty_id";
		List<Event> list  = (List<Event>)sessionFactory.getCurrentSession().createQuery(hql).setCacheable(true).setParameter("dynasty_id",dynasty_id).list();
		return list;
	}
	@Override
	public int getMaxIdofPlace(){
		String hql = "from Place";
		 Query query = sessionFactory.getCurrentSession().createQuery("select max(place_id) " + hql);
		 int max =((Integer) (query.uniqueResult())).intValue();
		 return max;
	}
	
	@Transactional(readOnly = true)
	public T findById(PK entityId) {
		return (T) sessionFactory.getCurrentSession().get(clazz, entityId);
	}

	@Transactional(readOnly = true)
	public boolean dataExists(String feildName, String feildValue) {
		String hql = "select count(*) from " + clazz.getSimpleName() + " o where o." + feildName + "=:feildValue";
		Long count = (Long) sessionFactory.getCurrentSession().createQuery(hql).setCacheable(true).setParameter("feildValue", feildValue).uniqueResult();
		if(count==0||count==null){//不存在
			return false;
		}
		return true;
	}
	
	//
	public boolean dataExistsByInt(String feildName,int feildValue) {
		String hql = "select count(*) from " + clazz.getSimpleName() + " o where o." + feildName + "=:feildValue";
		Long count = (Long) sessionFactory.getCurrentSession().createQuery(hql).setCacheable(true).setParameter("feildValue", feildValue).uniqueResult();
		if(count==0||count==null){//不存在
			return false;
		}
		return true;
	}
	
	public boolean datasExistsByInt(String feildName1,int feildValue1, String fieldName2,int feildValue2) {
		String hql = "select count(*) from " + clazz.getSimpleName() + " o where o." + feildName1 + "=:feildValue1 and o." + fieldName2 + "=:fieldValue2";
		Long count = (Long) sessionFactory.getCurrentSession().createQuery(hql).setCacheable(true).setParameter("feildValue1", feildValue1).setParameter("fieldValue2", feildValue2).uniqueResult();
		if(count==0||count==null){//不存在
			return false;
		}
		return true;
	}
	public boolean datasExists(String feildName1,String feildValue1, String fieldName2,int feildValue2) {
		String hql = "select count(*) from " + clazz.getSimpleName() + " o where o." + feildName1 + "=:feildValue1 and o." + fieldName2 + "=:fieldValue2";
		Long count = (Long) sessionFactory.getCurrentSession().createQuery(hql).setCacheable(true).setParameter("feildValue1", feildValue1).setParameter("fieldValue2", feildValue2).uniqueResult();
		if(count==0||count==null){//不存在
			return false;
		}
		return true;
	}
	
	public Long getCount(String feildName,String feildValue){
		String hql = "select count(*) from " + clazz.getSimpleName() + " o where o." + feildName + "=:feildValue";
		Long count = (Long) sessionFactory.getCurrentSession().createQuery(hql).setCacheable(true).setParameter("feildValue", feildValue).uniqueResult();
		if(count==0||count==null){//不存在
			return 0L;
		}
		return count;
	}
	public Long getCountByInt(String feildName,int feildValue){
		String hql = "select count(*) from " + clazz.getSimpleName() + " o where o." + feildName + "=:feildValue";
		Long count = (Long) sessionFactory.getCurrentSession().createQuery(hql).setCacheable(true).setParameter("feildValue", feildValue).uniqueResult();
		if(count==0||count==null){//不存在
			return 0L;
		}
		return count;
	}
	
	public List<T> findByTime(long time, String start_time, String end_time){
		String hql = "from " + clazz.getSimpleName() + " o where o." + start_time + "<:time and o." + end_time + ">:time";
		List<T> entities = (List<T>) sessionFactory.getCurrentSession().createQuery(hql).setCacheable(true).setParameter("time", time).list();
		return entities;
	}
	
	//自己添加的测试用的
	public List<T> findByTimeRange(long time1, String start_time, long time2, int count_num){
		List<T> entities = null;
		String hql = "from " + clazz.getSimpleName() + " o where o." + start_time + ">:time1 and o." + start_time + "<:time2 order by o.rank desc";
		try{
			if(count_num==0){
				entities = (List<T>) sessionFactory.getCurrentSession().createQuery(hql).setCacheable(true).setParameter("time1", time1).setParameter("time2", time2).list();
			}
			entities = (List<T>) sessionFactory.getCurrentSession().createQuery(hql).setCacheable(true).setParameter("time1", time1).setParameter("time2", time2).setFirstResult(1).setMaxResults(count_num).list();
		}catch(Exception e){
			e.printStackTrace();
		}
		return entities;
	}
	//为了时间轴的显示
	
	public T findByFeildByInt(String feildName, int feildValue) {
		String hql = "from " + clazz.getSimpleName() + " o where o." + feildName + "=:feildValue";
		T entity = (T) sessionFactory.getCurrentSession().createQuery(hql).setCacheable(true).setParameter("feildValue", feildValue).uniqueResult();
		return entity;
	}
	
	public List<T> findByFeildAll(String feildName, String feildValue) {
		String hql = "from " + clazz.getSimpleName() + " o where o." + feildName + " like "+"'%"+feildValue+"%'"+"order by start_time asc";
		List<T> entities = sessionFactory.getCurrentSession().createQuery(hql).setCacheable(true).list();
		return entities;
	}
	@Override
	public List<Event> getDataByYearRange(String start_year, String end_year) {
		String startyear_b = start_year+"-00-00";
		String endyear_b = end_year+"-00-00";
		TimeTrans.transDateToMillis(startyear_b);
		
		String hql = "from  Event  o where o.start_time > "+TimeTrans.transDateToMillis(startyear_b)+" and o.start_time < "+TimeTrans.transDateToMillis(endyear_b);
		List<Event> entities = sessionFactory.getCurrentSession().createQuery(hql).setCacheable(true).list();
		return entities;
	}
	public List<T> findListByFeildByInt(String feildName, int feildValue){
		String hql = "from " + clazz.getSimpleName() + " o where o." + feildName + "=:feildValue";
		List<T> entities = sessionFactory.getCurrentSession().createQuery(hql).setCacheable(true).setParameter("feildValue", feildValue).list();
		return entities ;
	}
	
	public T findByFeild(String feildName, String feildValue) {
		String hql = "from " + clazz.getSimpleName() + " o where o." + feildName + "=:feildValue";
		T entity = (T) sessionFactory.getCurrentSession().createQuery(hql).setCacheable(true).setParameter("feildValue", feildValue).uniqueResult();
		return entity;
	}
	public List<T> findByTwoFeildByInt(String feildName1, int feildValue1,String feildName2, int feildValue2){
		String hql = "from " + clazz.getSimpleName() + " o where o." + feildName1 + "=:feildValue1 and o."+ feildName2 + "=:feildValue2";
		List<T> entities = (List<T>) sessionFactory.getCurrentSession().createQuery(hql).setCacheable(true).setParameter("feildValue1", feildValue1).setParameter("feildValue2", feildValue2).list();
		System.out.println(hql);
		return entities;
	}
	public List<T> findByTwoFeild(String feildName1, int feildValue1,String feildName2, String feildValue2){
		String hql = "from " + clazz.getSimpleName() + " o where o." + feildName1 + "=:feildValue1 and o."+ feildName2 + "=:feildValue2";
		List<T> entities = (List<T>) sessionFactory.getCurrentSession().createQuery(hql).setCacheable(true).setParameter("feildValue1", feildValue1).setParameter("feildValue2", feildValue2).list();
		System.out.println(hql);
		return entities;
	}
	public T findOneByTwoFeildByInt(String feildName1, int feildValue1,String feildName2, int feildValue2){
		String hql = "from " + clazz.getSimpleName() + " o where o." + feildName1 + "=:feildValue1 and o."+ feildName2 + "=:feildValue2";
		T entity = (T)sessionFactory.getCurrentSession().createQuery(hql).setCacheable(true).setParameter("feildValue1", feildValue1).setParameter("feildValue2", feildValue2).uniqueResult();
		return entity;
	}
	
	public T findOneByTwoFeild(String feildName1, int feildValue1,String feildName2, String feildValue2){
		String hql = "from " + clazz.getSimpleName() + " o where o." + feildName1 + "=:feildValue1 and o."+ feildName2 + "=:feildValue2";
		T entity = (T)sessionFactory.getCurrentSession().createQuery(hql).setCacheable(true).setParameter("feildValue1", feildValue1).setParameter("feildValue2", feildValue2).uniqueResult();
		return entity;
	}
	public List<T> findsetByFeild(String feildName, String feildValue) {
		String hql = "from " + clazz.getSimpleName() + " o where o." + feildName + "=:feildValue";
		List<T> entities = sessionFactory.getCurrentSession().createQuery(hql).setCacheable(true).setParameter("feildValue", feildValue).list();
		return entities ;
	}
	public List<T> findsetByFeildByInt(String feildName, int feildValue) {
		String hql = "from " + clazz.getSimpleName() + " o where o." + feildName + "=:feildValue";
		List<T> entities = sessionFactory.getCurrentSession().createQuery(hql).setCacheable(true).setParameter("feildValue", feildValue).list();
		return entities ;
	}
	
	public List<T> query_vague(String feildName, String feildValue){
		String hql = "from " + clazz.getSimpleName() + " o where o." + feildName + "like:feildValue";
		List<T> entities = sessionFactory.getCurrentSession().createQuery(hql).setCacheable(true).setParameter("feildValue", feildValue).list();
		return entities;
	}
	
	@Transactional(readOnly = true)
	public List<T> findByIds(PK[] entityIds) {
		String hql = "from " + clazz.getSimpleName() + " o where o.id in (:entityIds)";
		List<T> entities = sessionFactory.getCurrentSession().createQuery(hql).setCacheable(true).setParameterList("entityIds", entityIds).list();
		return entities;
	}
	
	public T loadById(PK entityId) {
		return (T) sessionFactory.getCurrentSession().load(clazz, entityId);
	}

	public void update(T entity) {
		sessionFactory.getCurrentSession().update(entity);
	}

	@Transactional(readOnly = true)
	public PageBean<T> findByPage(int pageCurrent, int pageSize, List<String> wheres, List<Object> whereParams, List<Entry<String, String>> orders) {
		return this.findByPage(pageCurrent, pageSize, wheres, whereParams, orders, true);
	}

	public PageBean<T> findByPage(int pageCurrent, int pageSize, String hql) {
		/**
		 * 生成一个新的pageBean，里面的所有属性值均未初始化，切忌不可忘记begin和end的初始化。
		 * 根据API，创建一个PageBean对象需要三个参数： pageCurrent 、 recordCount 、 records。
		 */
		PageBean<T> pageBean = new PageBean();
		pageBean.setPageSize(pageSize);
		// 分页查询的第一条索引
		int first = (pageCurrent - 1) * pageSize;

		/* 获得总记录数 */
		int recordCount = this.getRecordCount(hql);

		/* 判断用户想要的数据页码是否超过总页码，也就是判断(pageCurrent-1)*pageSize是否超过总记录数 */
		if ((pageCurrent - 1) * pageSize >= recordCount) {
			return pageBean;
		}

		/* 开始进行分页查询 */
		Session session = sessionFactory.getCurrentSession();
		Query query = session.createQuery(hql)//
				// .setCacheable(true)//
				.setFirstResult(first)//
				.setMaxResults(pageSize);

		List<T> records = query.list();

		// 设置总记录数
		if (records != null) {
			pageBean.setRecords(records);
		}
		pageBean.setRecordCount(recordCount);

		// 初始化初始化pageBean的pageCount,begin和end值.
		pageBean.init();
		return pageBean;
	}

	/**
	 * 通用分页查询
	 */
	@Transactional(readOnly = true)
	public PageBean<T> findByPage(int pageCurrent, int pageSize, List<String> wheres, List<Object> whereParams, List<Entry<String, String>> orders, boolean isAnd) {

		/**
		 * 生成一个新的pageBean，里面的所有属性值均未初始化，切忌不可忘记begin和end的初始化。
		 * 根据API，创建一个PageBean对象需要四个参数： pageCurrent 、 recordCount 、 records、pageSize。
		 */
		PageBean<T> pageBean = new PageBean(pageCurrent,pageSize);

		// 分页查询的第一条索引
		int first = (pageCurrent - 1) * pageBean.getPageSize();

		/* 获得总记录数 */
		int recordCount = this.getRecordCount(wheres, whereParams);

		/* 判断用户想要的数据页码是否超过总页码，也就是判断(pageCurrent-1)*pageSize是否超过总记录数 */
		if ((pageCurrent - 1) * pageSize >= recordCount) {
			return pageBean;
		}

		/* 开始进行分页查询 */
		String hql = new HQLHelper().getHql(clazz, wheres, orders, isAnd);
		Session session = sessionFactory.getCurrentSession();
		Query query = session.createQuery(hql)//
				// .setCacheable(true)//
				.setFirstResult(first)//
				.setMaxResults(pageBean.getPageSize());
		setQueryParams(query, whereParams);

		List<T> records = query.list();

		// 设置总记录数
		if (records != null) {
			pageBean.setRecords(records);
		}
		pageBean.setRecordCount(recordCount);

		// 初始化初始化pageBean的pageCount,begin和end值.
		pageBean.init();
		return pageBean;
	}

	public PageBean<T> findByPage(int pageCurrent, int pageSize) {
		List<Entry<String, String>> orders = new ArrayList<Entry<String, String>>();
		orders.add(new SimpleEntry("o.id", "desc"));
		return findByPage(pageCurrent, pageSize, null, null, orders);
	}

	public PageBean<T> findByPage(int pageCurrent, int pageSize, List<String> wheres, List<Object> whereParams) {
		List<Entry<String, String>> orders = new ArrayList<Entry<String, String>>();
		orders.add(new SimpleEntry("o.id", "desc"));
		return findByPage(pageCurrent, pageSize, wheres, whereParams, orders);
	}

	public PageBean<T> findByPage(int pageCurrent, int pageSize, List<Entry<String, String>> orders) {
		return findByPage(pageCurrent,pageSize, null, null, orders);
	}
	
	public PageBean<T> findByPage(int pageCurrent, int pageSize, String feildName, String feildValue) {
		String hql = "from " + clazz.getSimpleName() + " o where o." + feildName + "=" + feildValue;
		return findByPage(pageCurrent, pageSize, hql);
	}
	
	/**
	 * 获得符合wheres条件的记录总数
	 * 
	 * @param wheres
	 * @return
	 */
	private int getRecordCount(List<String> wheres, List whereParams) {
		String hql = new HQLHelper().getCountHql(clazz, wheres);
		Query query = sessionFactory.getCurrentSession().createQuery(hql).setCacheable(true);
		setQueryParams(query, whereParams);
		Long recordCount = (Long) query.uniqueResult();
		return recordCount.intValue();
	}

	/**
	 * 根据传入的HQL语句查询记录数量。
	 * 
	 * @param hql
	 *            注意，该HQL语句是从FROM 开始的，应该在前面加上SELECT COUNT(*)语句。
	 * @return
	 */
	private int getRecordCount(String hql) {
		Query query = sessionFactory.getCurrentSession().createQuery("select count(*) " + hql);
		return ((Long) query.uniqueResult()).intValue();
	}

	/**
	 * 向query中设置？参数
	 * 
	 * @param query
	 * @param whereParams
	 */
	private void setQueryParams(Query query, List whereParams) {
		if (whereParams != null && whereParams.size() > 0) {
			for (int i = 0; i < whereParams.size(); i++) {
				// 注意：设置参数是从0开始
				query.setParameter(i, whereParams.get(i));
			}
		}
	}

	public int findNum() {
		// TODO Auto-generated method stub
		return 0;
	}

	public int numInTable() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Transactional(readOnly = true)
	public List<T> searchByHql(String hql) {
		List<T> entities = sessionFactory.getCurrentSession().createQuery(hql).setCacheable(true).list();
		return entities;
	}
	
	@Transactional(readOnly = true)
	public String findDynatynameById(int dynasty_id) {
		String hql="select dynasty_name from Dynasty o where o.dynasty_id ="+dynasty_id;
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		System.out.println(query.uniqueResult().toString()+"  lllllllll");
		String dynasty_name=query.uniqueResult().toString();
		return dynasty_name;
	}
}
