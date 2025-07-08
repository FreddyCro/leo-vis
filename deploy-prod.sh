# delete branch production
git branch -D production

# create branch production
git checkout -b production

# clone .env.production.example to .env
cp .env.production.example .env

# build the project
pnpm run build

# clone dist to docs
rm -rf docs
cp -r dist docs

# add and commit changes
git add .
git commit -m "deploy production"

# push to remote production branch
git push origin production --force