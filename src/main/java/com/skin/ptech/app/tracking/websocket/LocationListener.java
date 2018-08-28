package com.skin.ptech.app.tracking.websocket;

import com.skin.ptech.app.tracking.repository.GPSLocationRepository;
import com.skin.ptech.app.tracking.rest.DetaineeResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.handler.annotation.Headers;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.skin.ptech.app.tracking.domain.GPSLocation;

@Service
public class LocationListener {
		
	@Autowired
	private SimpMessagingTemplate template;

	@Autowired
	private GPSLocationRepository gpsRepository;

	Logger logger = LoggerFactory.getLogger(LocationListener.class);

	@KafkaListener(topics = "${spring.kafka.topicid}")
    public void receive(@Payload String data,
                        @Headers MessageHeaders headers) {

        logger.info("consuming from kafka" + data.toString());
        //ObjectMapper mapper = new ObjectMapper();
        Gson gson = new GsonBuilder().create();
		GPSLocation gpsLoc = gson.fromJson(data, GPSLocation.class);
		this.template.convertAndSend("/topic/vehicleTracking",gpsLoc);
		gpsRepository.save(gpsLoc);

    }
}
