# delete branch nmdap
git branch -D nmdap

# create branch nmdap
git checkout -b nmdap

# clone .env.nmdap.example to .env
cp .env.nmdap.example .env

# build the project
pnpm run build

# clone dist to docs
rm -rf docs
cp -r dist docs

# add and commit changes
git add .
git commit -m "deploy nmdap"

# push to remote nmdap branch
git push origin nmdap --force