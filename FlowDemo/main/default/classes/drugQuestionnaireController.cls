public with sharing class drugQuestionnaireController
{
    @AuraEnabled
    public static List<Questions__c> getQuestionsFromDrug(String drugId)
    {
        List<Questions__c> qs = [SELECT Id, Name
                                 FROM Questions__c
                                 WHERE Drug__c = :drugId
                                 ORDER BY Order__c];
        return qs;
    }
    
    @AuraEnabled
    public static List<Questions__c> getQuestionsFromCase(String caseId)
    {
        Case c = [SELECT Id, ProductNameGood__c
                  FROM Case
                  WHERE Id = :caseId
                  LIMIT 1];
        
        String drugId = c.ProductNameGood__c;
        
        List<Questions__c> qs = [SELECT Id, Name, Prompt__c
                                 FROM Questions__c
                                 WHERE Drug__c = :drugId
                                 ORDER BY Order__c, Name];

        return qs;
    }
    
    @AuraEnabled
    public static void setQuestionResponses(List<Question_Response__c> questionResponses)
    {
        update questionResponses;
    }
        
    @AuraEnabled
    public static List<Question_Response__c> getQuestionReponsesFromCase(String caseId)
    {
        Case c = [SELECT Id, ProductNameGood__c
                  FROM Case
                  WHERE Id = :caseId
                  LIMIT 1];
        
        String drugId = c.ProductNameGood__c;

        List<Questions__c> reps = [SELECT Id, Name, Prompt__c,
                                   (SELECT Id, Name, Drug__c, Case__c, Response__c, Question__r.Name, Question__r.Prompt__c
                                    FROM Question_Responses__r
                                    WHERE Drug__c = :drugId
                                    AND Case__c = :caseId)
                                   FROM Questions__c
                                   WHERE Drug__c = :drugId
                                   ORDER BY Order__c, Name];
        
        List<Question_Response__c> qrs = new List<Question_Response__c>();
        
        for (Questions__c q : reps)
        {
            Integer s = q.Question_Responses__r.size();
            if (s < 1)
            {
                Question_Response__c qr;
                qr = new Question_Response__c();
                qr.Drug__c = drugId;
                qr.Case__c = caseId;
                qr.Question__c = q.Id;
                qr.Response__c = '';
                qrs.add(qr);
            }
        }
        
        if (qrs.size() > 0)
        {
        	insert qrs;
        }
        
        qrs = [SELECT Id, Name, Drug__c, Case__c, Response__c, Question__r.Name, Question__r.Prompt__c
               FROM Question_Response__c
               WHERE Drug__c = :drugId
               AND Case__c = :caseId];
        
        return qrs;
    }
    
}