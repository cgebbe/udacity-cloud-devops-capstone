# get this from backend CI job
IP_ADDRESS=a97b6476955314bd1a6db9f95905553d-1273141615.us-east-1.elb.amazonaws.com

# LOCAL
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
DEPLOY_DIR=frontend_deploy
FRONTEND_VERSION=geb-20221009-v1

prepare-files:
	rm -rf ${DEPLOY_DIR}
	mkdir -p ${DEPLOY_DIR}/${FRONTEND_VERSION}

	cp index.* ${DEPLOY_DIR}/${FRONTEND_VERSION}
	cp *.css ${DEPLOY_DIR}/${FRONTEND_VERSION}
	cp redirect.html ${DEPLOY_DIR}

	find ${DEPLOY_DIR}

	@# We need to replace localhost with the actual backend IP
	sed -i 's/localhost/${IP_ADDRESS}/' ${DEPLOY_DIR}/${FRONTEND_VERSION}/index.js
	cat ${DEPLOY_DIR}/${FRONTEND_VERSION}/index.js

	@# We also replace the VERSION so we can test cloudfont 
	sed -i 's/VERSION/${FRONTEND_VERSION}/' ${DEPLOY_DIR}/${FRONTEND_VERSION}/index.html
	cat ${DEPLOY_DIR}/${FRONTEND_VERSION}/index.html

	@# Last, we update the redirect document
	sed -i 's/SUBDIR/${FRONTEND_VERSION}/' ${DEPLOY_DIR}/redirect.html
	cat ${DEPLOY_DIR}/redirect.html


open-prepared-files:
	google-chrome ${DEPLOY_DIR}/redirect.html


# S3
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
BUCKET_NAME=561130499334-capstone-frontend
AWS_REGION=eu-central-1
init-s3:
	aws s3 mb s3://${BUCKET_NAME}
	aws s3 ls
	@echo "Enable static website hosting for this bucket via UI!"

S3_WEBSITE=http://${BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com
copy-to-s3:
	aws s3 sync ${DEPLOY_DIR}/${FRONTEND_VERSION} s3://${BUCKET_NAME}/${FRONTEND_VERSION}
	curl --fail ${S3_WEBSITE}/${FRONTEND_VERSION}/index.html

# FYI: It's rather tricky to make cloudfront directly serve content from S3 subfolders, see
# https://stackoverflow.com/a/59649703/2135504
# https://stackoverflow.com/a/33087418/2135504
# Therefore, we simply use a redirect document.
# When uploading a new version, we can create a new document :).
release-new-s3-version:
	aws s3 cp ${DEPLOY_DIR}/redirect.html s3://${BUCKET_NAME}/index.html
	curl --fail ${S3_WEBSITE}/index.html


# CLOUDFRONT (OR ALTERNATIVELY)
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
CLOUDFRONT_ID=ETD9T602VVR79
CLOUDFRONT_NAME=d35lip4c5u1vnb.cloudfront.net
init-cloudfront:
	@echo "Init via AWS UI"

# necessary, otherwise cached too long
# https://stackoverflow.com/a/60049652/2135504
invalidate-cloudfront:
	aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_ID} --paths "/*"

curl-cloudfont:
	curl --fail ${CLOUDFRONT_NAME}


# order:
# - backend + smoke test
# - local + s3 upload
# - If we really wanted to, we could check cloudfront for the version automatically?!
# 	- However, rather run curl in CI and check manually
# - cloudfront update NOT necessary, always pointing to s3 bucket