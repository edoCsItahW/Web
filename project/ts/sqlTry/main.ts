/*
 - Copyright (c) 2024. All rights reserved.
 - This source code is licensed under the CC BY-NC-SA
 - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 - This software is protected by copyright law. Reproduction, distribution, or use for commercial
 - purposes is prohibited without the author's permission. If you have any questions or require
 - permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
import { createConnection, type Connection, type ConnectionConfig } from "mysql"

interface ConConfig extends ConnectionConfig {
    database?: string;
    table?: string;
}

namespace Field {
    enum Type {
        INT = "INT",
        VARCHAR = "VARCHAR",
        TEXT = "TEXT",
        DATETIME = "DATETIME",
        DATE = "DATE",
        TIME = "TIME",
        DECIMAL = "DECIMAL",
        FLOAT = "FLOAT",
        BOOLEAN = "BOOLEAN",
        SET = "SET",
        JSON = "JSON",
        POINT = "POINT",
        UUID = "UUID",
        MACADDR = "MACADDR",
        BIT = "BIT",
    }
    enum Option {
        SHOW = "SHOW",
        DATABASES = "DATABASES",
        TABLES = "TABLES",
        COLUMNS = "COLUMNS",
        INDEXES = "INDEXES",
        CREATE = "CREATE",
        DROP = "DROP",
        INSERT = "INSERT",
        SELECT = "SELECT",
        UPDATE = "UPDATE",
        DELETE = "DELETE",
        ALTER = "ALTER",

    }
}
// https://www.w3schools.com/nodejs/nodejs_mysql_create_db.asp
class MySQL {
    private con: Connection;
    #db: string;
    #table: string;

    constructor(private options: ConConfig) {
        this.con = createConnection(options);
        this.#db = options.database;
        this.#table = options.table;
    }



}

