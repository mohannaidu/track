package com.skin.ptech.app.tracking.domain;

import java.util.HashMap;

import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "BLElocations")
public class BLELocation {

	  private String id;
	  private String uuid;
	  private String type;
	  private GeoJsonPoint geometry;
	  private HashMap<String, String>  properties;

	  
	public BLELocation(String uuid, String type, GeoJsonPoint geometry, HashMap properties) {
		super();
		this.uuid = uuid;
		this.type = type;
		this.geometry = geometry;
		this.properties = properties;
	}

	public BLELocation() {
		
	}

	

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}


	public GeoJsonPoint getGeometry() {
		return geometry;
	}

	public void setGeometry(GeoJsonPoint geometry) {
		this.geometry = geometry;
	}

	public HashMap<String, String> getProperties() {
		return properties;
	}

	public void setProperties(HashMap<String, String> properties) {
		this.properties = properties;
	}


}
