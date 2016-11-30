patch:
  npm version patch
  npm run build
  git push --tags
  git push origin master
  cd dist
  npm publish
