#!/bin/bash
files=$(find . -name "*.shp" -print0 | xargs -0 basename)
files_array=( `echo $files | tr -s ',' ' '`)
	for ((i=0; i<${#files_array[*]}; i++ ))
	do
		filename="${files_array[i]%.*}"
		ogr2ogr -f GeoJSON $filename".geojson" ${files_array[i]} #geojson形式に変換
		topojson -p name -p name_local -p latitude -p longitude -o $filename".topojson" $filename".geojson" #topojson形式に変換
	done