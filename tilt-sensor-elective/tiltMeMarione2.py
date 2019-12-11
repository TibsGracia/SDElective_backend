import RPi.GPIO as GPIO
import time
# import paho.mqtt.client as mqtt

LedPin = 22    # pin11
import paho.mqtt.client as mqtt
# def setup():
GPIO.setmode(GPIO.BOARD)       # Numbers GPIOs by physical location
GPIO.setup(LedPin, GPIO.OUT) 
GPIO.output(LedPin, 1)
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
   
client = mqtt.Client()
client.on_connect = on_connect

client.connect("test.mosquitto.org", 1883, 60)
while True:
	if GPIO.input(LedPin):
		print ('...Tilted...')
		client.publish("tilt","tilted-door1")
		time.sleep(1)
	else:
		print ('...Standing...')
		client.publish("tilt","Standing-door1")
		time.sleep(1)
client.loop_forever()


