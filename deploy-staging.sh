# delete branch staging
git branch -D staging

# create branch staging
git checkout -b staging

# clone .env.ghpage.example to .env
cp .env.ghpage.example .env

# build the project
pnpm run build

# clone dist to docs
rm -rf docs
cp -r dist docs

# add and commit changes
git add .
git commit -m "deploy staging"

# push to remote staging branch
git push origin staging --force