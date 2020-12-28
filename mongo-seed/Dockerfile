FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongo --db colors --collection colorbycategories --type json --file /init.json --jsonArray