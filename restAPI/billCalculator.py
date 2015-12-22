##  http://cyber.kepco.co.kr/ckepco/front/jsp/CY/E/E/CYEEHP00101.jsp

##  won / kWh
billRate = [60.7, 125.9, 187.9, 280.6, 417.7, 709.5]

def getBill(totalUsageKWh):
    totalUsageKWh
    
    won = 0
    
    for i in range(len(billRate) - 1):
        if totalUsageKWh > 100:
            won = won + 100 * billRate[i] 
        else:
            won = won + totalUsageKWh * billRate[i] 
        totalUsageKWh = totalUsageKWh - 100
        if totalUsageKWh < 0:
            break

    if totalUsageKWh > 0:
        won = won + totalUsageKWh * billRate[len(billRate) - 1]
    
    return won
    