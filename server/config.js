// first, remove configuration entry in case service is already configured
ServiceConfiguration.configurations.remove({
    service: "facebook"
});
ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: "567565506705613",
    secret: "c5d794b322739998b5b258465c066410"
});