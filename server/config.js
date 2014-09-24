// first, remove configuration entry in case service is already configured
ServiceConfiguration.configurations.remove({
    service: "facebook"
});
ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: "567565506705613",
    secret: "2183ae7dfc2f7dd6a327a4f50e8028fa"
});