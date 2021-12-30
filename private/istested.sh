find . -name '*.ts' | \
  grep -v node_modules | \
  grep -v './test/' | \
  grep -v './lib/records/' |
while read line
do
  echo "wtf"
  find ./test -name '*.ts' -exec 'grep' '-l' "$line" ';' | \
  while read line2
  do
    echo f=$line
    echo r=$line2
  done
done
