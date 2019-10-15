package fr.rehia.sockjspoc;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Controller
public class StompListener {

  private static final Logger logger = LoggerFactory.getLogger(StompListener.class);
  @SubscribeMapping("/test/{number}")
  public String pingNumber(@DestinationVariable("number") String number) throws InterruptedException {
    logger.info("received subscription on /test/number");
    Thread.sleep(1000);
    logger.info("sending message back...");
    return "\"hello " + number + " !\"";
  }

}