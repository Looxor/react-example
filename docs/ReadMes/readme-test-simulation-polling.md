### Scenario of Polling

#### 1. Base process of Polling
<pre>
Simulation is running? ------------------->    YES
Simulation is running? ------------------->    YES
Simulation is running? ------------------->    NO

                     SUCCESS  -> Show P4.4 or P4.5
Simulation is |  ___/   
finished with |  ---\ 
                     NO SUCCESS -> Do nothing
</pre>

#### 2. When getting the push notification
```
Stops the polling 
```

#### 3. When getting the push notification from background or closing
```
Starts the app, but does not start the polling.
```

#### 4. A simulation was running before closing the app. 
##### And when starts the app,
```
Start the polling 
- until getting the push notification of termination
- until the response of termination
```

