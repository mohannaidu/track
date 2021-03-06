package com.skin.ptech.app.tracking.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.skin.ptech.app.tracking.domain.BLELocation;

public interface BLELocationRepository extends MongoRepository<BLELocation, String> {

	Optional<BLELocation> findTopByUuidOrderByIdDesc(String uuid);

	List<BLELocation> findFirst50ByUuidOrderByIdDesc(String uuid);

	  //List<LocationEntity> findBySubjectAndLocationNear(String sid, Point p, Distance d);

}