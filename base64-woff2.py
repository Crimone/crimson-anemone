#!/usr/bin/python2
# -*- coding: utf-8 -*-
'''
 将base码转换为文件的脚本，可以解码图片
 Author:Hvnt3r
 Date:2018.8.22
'''
import base64
#import codecs #解码其他编码格式如GBK需要的模块

decoded_file_name=".\\files\\zuijinregular-normal.woff"  # 定义转换后的文件名，包括后缀

def base_to_file():
    base64String = ""

    #写入文件
    with open(decoded_file_name, 'wb') as f:
        f.write(base64.b64decode(base64String))
        print("解码完毕")

if __name__ == "__main__":
    base_to_file()
