import sqlite3
import os
from mortality import mortality

def update_db():
    risksConn = None
    countriesConn = None
    
    try:
        thisFilePath = os.path.dirname(os.path.abspath( __file__ ))
        risksConn = sqlite3.connect(os.path.join(thisFilePath, "../databases/risks.sqlite"))
        countriesConn = sqlite3.connect(os.path.join(thisFilePath, "../databases/countries.sqlite"))

        countriesConn.cursor()
        countries = countriesConn.execute("SELECT * FROM countries").fetchall()
        countriesConn.close()

        risksConn.cursor()
        risksConn.execute("DROP TABLE IF EXISTS countries_risks")
        risksConn.execute("""
            CREATE TABLE IF NOT EXISTS countries_risks (
                id INTEGER PRIMARY KEY,
                risk REAL
            )
        """)

        for i in range(0, len(countries)):
            try:
                risksConn.cursor()
                risksConn.execute("""
                    INSERT INTO countries_risks VALUES ({}, {})
                """.format(countries[i][0], mortality(age=0, sex="ANY", country=countries[i][1])))
            except:
                pass

        risksConn.commit()
        risksConn.close()
        
    except sqlite3.Error as err:
        print("Error happened!")
        print(err)
    

if __name__ == "__main__":
    update_db()