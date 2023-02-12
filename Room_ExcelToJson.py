from glob import glob
import pandas as pd
import json

# Excelファイルの取得
path = "../アヤティーズデータ/"
excel = glob(path + "*.xlsx")

# データの取得
df = pd.read_excel(excel[0], sheet_name="教室データ")
df = df.iloc[:, 1:7]
df.columns = ['建物名', '部屋名', '階', '建物ポインタ', '学部', '学科']

# 辞書型を準備
dict = {}

# 学部の取得
fac = df.loc[:, "学部"].unique()
print(fac)

for i in fac: 
    dict[i] = {}
    
    # 学科の取得
    dep = df[df["学部"] == i].loc[:, "学科"]
    dep = dep.unique()
        
    # 教室名の取得
    for j in dep:
        dict[i][j] = {}
        room_data = df[df["学科"] == j].loc[:, ["部屋名", "階", "建物ポインタ"]]
        room_data.index = [i for i in range(len(room_data))]
        
        for k in range(len(room_data)):
            room = room_data.loc[k, "部屋名"]
            floor = room_data.loc[k, "階"]
            pointer = room_data.loc[k, "建物ポインタ"]
            dict[i][j][room] = {"floor": str(floor), "pointer": str(pointer)}
        
        
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(dict, f, ensure_ascii=False)
