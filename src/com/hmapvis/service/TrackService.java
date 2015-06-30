package com.hmapvis.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.hmapvis.bean.Track;

@Service("trackService")
@Transactional
public interface TrackService extends BaseService<Track, Integer> {

}
