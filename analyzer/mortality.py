import sys
import requests
import bs4
import os

def path (_str):
    return os.path.join(os.path.dirname(os.path.abspath(__file__)), _str)


def get_gdp(country):
    file = open(path("List of countries by GDP.html"), "r", encoding="UTF-8")
    search_page = file.read()
    file.close()
    search_page = bs4.BeautifulSoup(search_page, "html.parser")("table")
    return float(search_page[1].find("a", {"title": country}).parent.parent("td")[-1].text.replace(",", "."))


def get_hazard_risk(country):
    file = open(path("List of countries by natural disaster risk.html"), "r", encoding="UTF-8")
    search_page = file.read()
    file.close()
    search_page = bs4.BeautifulSoup(search_page, "html.parser")
    search_page = float(search_page.find("a", {"title": country}).parent.parent("td")[2].text[:-2])/100
    return search_page



def get_mid_age(country):
    file = open(path("List of countries by median age.html"), "r", encoding="UTF-8")
    search_page = file.read()
    file.close()
    search_page = bs4.BeautifulSoup(search_page, "html.parser")
    search_page =float(search_page.find("a", {"title": country}).parent.parent.parent("td")[2].text)
    return search_page


def mortality(age, sex, country):
    """A function used to calculate death chance for a person for a year according to their social category"""

    try:
        age = int(age)

        if age == 0:
            age = get_mid_age(country)
        economical_factor = get_gdp(country)
        hazard_factor = get_hazard_risk(country)

        if age > 0 and age <=5:
            age_factor = 0.5
        elif age > 5 and age < 13:
            age_factor = 0.7
        elif age >= 13 and age <20:
            age_factor = 0.5
        elif age >= 20 and age <35:
            age_factor = 0.3
        elif age >= 35 and age < 50:
            age_factor = 0.4
        elif age >= 50 and age <60:
            age_factor = 0.5
        elif age >= 60:
            age_factor = 0.7
        if sex == "M":
            sex_factor = 0.6
        elif sex == "ANY":
            sex_factor = 0.7
        else:
            sex_factor = 0.8
        mortality_risk = sex_factor*age_factor*economical_factor*hazard_factor
        return mortality_risk
    except:
        return -1


if __name__ == "__main__":
    age, sex, country = sys.argv[1:]
    print(mortality(age, sex, country))