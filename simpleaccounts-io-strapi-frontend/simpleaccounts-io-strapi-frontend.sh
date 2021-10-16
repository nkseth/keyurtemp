#!/bin/bash
#
# Prarameters
# 1 - install or upgrade operation
# 2 - subdomain name for SimpleAccounts installation
# 3 - SimpleAccounts docker image version (Frontend)
# End of parameters
#
if [ "$1" != "upgrade" ]
then
        echo "ERROR: Wrong operation"
        exit 1
elif [[ $# != 3 ]]
then
        echo "ERROR: Wrong number of argumeents"
        exit 1
fi

echo "Start SimpleAccounts $1 for $2:$3"

nameserver="simpleaccounts-io-strapi-website"
maindomain="simpleaccounts.io"
subdomain="$2"
helmDir="simpleaccounts-io-strapi-frontend"
SVrelease="$3"
createDatabase="false"
subdomainBackend="strapi"


echo "Test deployment script"

helm $1 --install $subdomain-frontend simpleaccounts-strapi-website/$helmDir --values simpleaccounts-strapi-website/$helmDir/values.yaml \
--set simpleAccountsFrontendRelease=$SVrelease \
--set image.repository.frontend.tag=$SVrelease \
--set simpleAccountsBackendHost="https://$subdomainBackend-api.$maindomain" \
--set fullnameOverride=$subdomain-frontend \
--set serviceAccount.name=$subdomain-deploy-robot-frontend \
--set ports.containerPort.frontendPort=80 \
--set service.port=80 \
--set ingress.hosts[0].host=$subdomain.$maindomain \
--set ingress.hosts[0].paths[0]="/*" \
--set ingress.tls[0].hosts[0]=$subdomain.$maindomain \
--set ingress.tls[0].hosts[1]=www.$subdomain.$maindomain \
--set ingress.tls[0].secretName=simpleaccounts-io-strapi-test-website-tls \
--set database.enabled=$createDatabase \
-n $nameserver \
--dry-run --debug --wait

echo "Deploying the scripts"

helm $1 --install $subdomain-frontend simpleaccounts-strapi-website/$helmDir --values simpleaccounts-strapi-website/$helmDir/values.yaml \
--set simpleAccountsFrontendRelease=$SVrelease \
--set image.repository.frontend.tag=$SVrelease \
--set simpleAccountsBackendHost="https://$subdomainBackend-api.$maindomain" \
--set fullnameOverride=$subdomain-frontend \
--set serviceAccount.name=$subdomain-deploy-robot-frontend \
--set ports.containerPort.frontendPort=80 \
--set service.port=80 \
--set ingress.hosts[0].host=$subdomain.$maindomain \
--set ingress.hosts[0].paths[0]="/*" \
--set ingress.tls[0].hosts[0]=$subdomain.$maindomain \
--set ingress.tls[0].hosts[1]=www.$subdomain.$maindomain \
--set ingress.tls[0].secretName=simpleaccounts-io-strapi-test-website-tls \
--set database.enabled=$createDatabase \
-n $nameserver \
--wait

echo "Deployment done."
