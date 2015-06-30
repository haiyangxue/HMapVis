package com.hmapvis.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hmapvis.bean.VoteRecord;

@Service("voterecordService")
@Transactional
public interface VoteRecordService extends BaseService<VoteRecord, Integer> {

}
