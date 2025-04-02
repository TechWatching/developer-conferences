import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure-native";

const resourceGroup = new azure.resources.ResourceGroup("devconfs");

const staticWebApp = new azure.web.StaticSite("devconfs-site", {
    resourceGroupName: resourceGroup.name,
    location: resourceGroup.location,
    sku: {
        name: "Free",
        tier: "Free"
    },
    buildProperties: {},
});

const staticSecretOutputs = azure.web.listStaticSiteSecretsOutput({
    resourceGroupName: resourceGroup.name,
    name: staticWebApp.name,
});

const customDomain = new azure.web.StaticSiteCustomDomain("customDomain", {
    resourceGroupName: resourceGroup.name,
    name: staticWebApp.name,
    domainName: "devconferences.techwatching.dev"
});

export const staticWebAppUrl = staticWebApp.defaultHostname;
export const staticWebAppDeploymentToken = pulumi.secret(staticSecretOutputs.properties.apply(p => p.apiKey));