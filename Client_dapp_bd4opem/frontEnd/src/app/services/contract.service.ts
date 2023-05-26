/**
 * BD4OPEM Account Management module API Specification
 * This document contains the formal specification of the interfaces with Account and Contracting management in the BD4OPEM Marketplace.
 *
 * OpenAPI spec version: 0.0.25
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

 import { Inject, Injectable, Optional }                      from '@angular/core';
 import { HttpClient, HttpHeaders, HttpParams,
          HttpResponse, HttpEvent }                           from '@angular/common/http';
 import { CustomHttpUrlEncodingCodec }                        from '../encoder';
 
 import { Observable }                                        from 'rxjs';
 
 import { Contract } from '../models/contract';
 import { ContractOffer } from '../models/contractOffer';
 import { IssueContractResponse } from '../models/issueContractResponse';
 import { ReturnContract } from '../models/returnContract';
 
 import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
 import { Configuration }                                     from '../configuration';
 
 
 @Injectable()
 export class ContractService {
 
     protected basePath = 'https://ssi-account.aks-marketplace.bd4opem.eu';
     public defaultHeaders = new HttpHeaders();
     public configuration = new Configuration();
 
     constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
         if (basePath) {
             this.basePath = basePath;
         }
         if (configuration) {
             this.configuration = configuration;
             this.basePath = basePath || configuration.basePath || this.basePath;
         }
     }
 
     /**
      * @param consumes string[] mime-types
      * @return true: consumes contains 'multipart/form-data', false: otherwise
      */
     private canConsumeForm(consumes: string[]): boolean {
         const form = 'multipart/form-data';
         for (const consume of consumes) {
             if (form === consume) {
                 return true;
             }
         }
         return false;
     }
 
 
     /**
      * Administration actions on the contract ID which are authorised mostly by the accountID being the owner of the contracts. For a Data Provider to approve or reject a Data User request then only the DP can change the status from DRAFT to APPROVED or REJECTED and this is authorised by checking that the contractProviderID in the contract matches the organisationID in the Access Token.
      * 
      * @param contractID contractId
      * @param adminAction 
      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
      * @param reportProgress flag to report request and response progress.
      */
     public contractContractIDAdminActionPost(contractID: string, adminAction: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
     public contractContractIDAdminActionPost(contractID: string, adminAction: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
     public contractContractIDAdminActionPost(contractID: string, adminAction: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
     public contractContractIDAdminActionPost(contractID: string, adminAction: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
 
         if (contractID === null || contractID === undefined) {
             throw new Error('Required parameter contractID was null or undefined when calling contractContractIDAdminActionPost.');
         }
 
         if (adminAction === null || adminAction === undefined) {
             throw new Error('Required parameter adminAction was null or undefined when calling contractContractIDAdminActionPost.');
         }
 
         let headers = this.defaultHeaders;
 
         // authentication (bearerAuth) required
         if (this.configuration.accessToken) {
             const accessToken = typeof this.configuration.accessToken === 'function'
                 ? this.configuration.accessToken()
                 : this.configuration.accessToken;
             headers = headers.set('Authorization', 'Bearer ' + accessToken);
         }
         // to determine the Accept header
         let httpHeaderAccepts: string[] = [
         ];
         const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         if (httpHeaderAcceptSelected != undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
         // to determine the Content-Type header
         const consumes: string[] = [
         ];
 
         return this.httpClient.request<any>('post',`${this.basePath}/contract/${encodeURIComponent(String(contractID))}/${encodeURIComponent(String(adminAction))}`,
             {
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }
 
     /**
      * Delete the contract for the ID provided. Able to be requested by an organisation´s administrator.
      * 
      * @param contractID Action taken by the administrator
      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
      * @param reportProgress flag to report request and response progress.
      */
     public contractContractIDDelete(contractID: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
     public contractContractIDDelete(contractID: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
     public contractContractIDDelete(contractID: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
     public contractContractIDDelete(contractID: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
 
         if (contractID === null || contractID === undefined) {
             throw new Error('Required parameter contractID was null or undefined when calling contractContractIDDelete.');
         }
 
         let headers = this.defaultHeaders;
 
         // authentication (bearerAuth) required
         if (this.configuration.accessToken) {
             const accessToken = typeof this.configuration.accessToken === 'function'
                 ? this.configuration.accessToken()
                 : this.configuration.accessToken;
             headers = headers.set('Authorization', 'Bearer ' + accessToken);
         }
         // to determine the Accept header
         let httpHeaderAccepts: string[] = [
         ];
         const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         if (httpHeaderAcceptSelected != undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
         // to determine the Content-Type header
         const consumes: string[] = [
         ];
 
         return this.httpClient.request<any>('delete',`${this.basePath}/contract/${encodeURIComponent(String(contractID))}`,
             {
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }
 
     /**
      * Create the contract
      * 
      * @param body The Registration request input parameters
      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
      * @param reportProgress flag to report request and response progress.
      */
     public contractPost(body: ContractOffer, observe?: 'body', reportProgress?: boolean): Observable<IssueContractResponse>;
     public contractPost(body: ContractOffer, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<IssueContractResponse>>;
     public contractPost(body: ContractOffer, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<IssueContractResponse>>;
     public contractPost(body: ContractOffer, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
 
         if (body === null || body === undefined) {
             throw new Error('Required parameter body was null or undefined when calling contractPost.');
         }
 
         let headers = this.defaultHeaders;
 
         // authentication (bearerAuth) required
         if (this.configuration.accessToken) {
             const accessToken = typeof this.configuration.accessToken === 'function'
                 ? this.configuration.accessToken()
                 : this.configuration.accessToken;
             headers = headers.set('Authorization', 'Bearer ' + accessToken);
         }
         // to determine the Accept header
         let httpHeaderAccepts: string[] = [
             'application/json'
         ];
         const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         if (httpHeaderAcceptSelected != undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
         // to determine the Content-Type header
         const consumes: string[] = [
             'application/json'
         ];
         const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
         if (httpContentTypeSelected != undefined) {
             headers = headers.set('Content-Type', httpContentTypeSelected);
         }
 
         return this.httpClient.request<IssueContractResponse>('post',`${this.basePath}/contract`,
             {
                 body: body,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }
 
     /**
      * Update the contract
      * 
      * @param body The Registration request input parameters
      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
      * @param reportProgress flag to report request and response progress.
      */
     public contractPut(body: Contract, observe?: 'body', reportProgress?: boolean): Observable<IssueContractResponse>;
     public contractPut(body: Contract, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<IssueContractResponse>>;
     public contractPut(body: Contract, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<IssueContractResponse>>;
     public contractPut(body: Contract, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
 
         if (body === null || body === undefined) {
             throw new Error('Required parameter body was null or undefined when calling contractPut.');
         }
 
         let headers = this.defaultHeaders;
 
         // authentication (bearerAuth) required
         if (this.configuration.accessToken) {
             const accessToken = typeof this.configuration.accessToken === 'function'
                 ? this.configuration.accessToken()
                 : this.configuration.accessToken;
             headers = headers.set('Authorization', 'Bearer ' + accessToken);
         }
         // to determine the Accept header
         let httpHeaderAccepts: string[] = [
             'application/json'
         ];
         const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         if (httpHeaderAcceptSelected != undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
         // to determine the Content-Type header
         const consumes: string[] = [
             'application/json'
         ];
         const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
         if (httpContentTypeSelected != undefined) {
             headers = headers.set('Content-Type', httpContentTypeSelected);
         }
 
         return this.httpClient.request<IssueContractResponse>('put',`${this.basePath}/contract`,
             {
                 body: body,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }
 
    
 
     /**
      * Returns the latest versions of the contracts for the account ID given for the specified contract type
      * 
      * @param accountID accountID of the organisation
      * @param contractType contract types
      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
      * @param reportProgress flag to report request and response progress.
      */
     public listContracts(accountID: string, contractType: string, observe?: 'body', reportProgress?: boolean): Observable<Array<ReturnContract>>;
     public listContracts(accountID: string, contractType: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ReturnContract>>>;
     public listContracts(accountID: string, contractType: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ReturnContract>>>;
     public listContracts(accountID: string, contractType: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
 
         if (accountID === null || accountID === undefined) {
             throw new Error('Required parameter accountID was null or undefined when calling listContracts.');
         }
 
         if (contractType === null || contractType === undefined) {
             throw new Error('Required parameter contractType was null or undefined when calling listContracts.');
         }
 
         let headers = this.defaultHeaders;
 
         // authentication (bearerAuth) required
         if (this.configuration.accessToken) {
             const accessToken = typeof this.configuration.accessToken === 'function'
                 ? this.configuration.accessToken()
                 : this.configuration.accessToken;
             headers = headers.set('Authorization', 'Bearer ' + accessToken);
         }
         // to determine the Accept header
         let httpHeaderAccepts: string[] = [
             'application/json'
         ];
         const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         if (httpHeaderAcceptSelected != undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
         // to determine the Content-Type header
         const consumes: string[] = [
         ];
 
         return this.httpClient.request<Array<ReturnContract>>('get',`${this.basePath}/contract/${encodeURIComponent(String(accountID))}/${encodeURIComponent(String(contractType))}/list`,
             {
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }
 
     /**
      * Returns the latest versions of the contracts for the contractProviderID given for the specified contract type. This is authorised by the ContractProviderID matching the organisationID in the Access Token.
      * 
      * @param contractProviderID Contract provider organisation ID
      * @param contractType contract types
      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
      * @param reportProgress flag to report request and response progress.
      */
     public listContractsForContractProviderOrganisation(contractProviderID: string, contractType: string, observe?: 'body', reportProgress?: boolean): Observable<Array<ReturnContract>>;
     public listContractsForContractProviderOrganisation(contractProviderID: string, contractType: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ReturnContract>>>;
     public listContractsForContractProviderOrganisation(contractProviderID: string, contractType: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ReturnContract>>>;
     public listContractsForContractProviderOrganisation(contractProviderID: string, contractType: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
 
         if (contractProviderID === null || contractProviderID === undefined) {
             throw new Error('Required parameter contractProviderID was null or undefined when calling listContractsForContractProviderOrganisation.');
         }
 
         if (contractType === null || contractType === undefined) {
             throw new Error('Required parameter contractType was null or undefined when calling listContractsForContractProviderOrganisation.');
         }
 
         let headers = this.defaultHeaders;
 
         // authentication (bearerAuth) required
         if (this.configuration.accessToken) {
             const accessToken = typeof this.configuration.accessToken === 'function'
                 ? this.configuration.accessToken()
                 : this.configuration.accessToken;
             headers = headers.set('Authorization', 'Bearer ' + accessToken);
         }
         // to determine the Accept header
         let httpHeaderAccepts: string[] = [
             'application/json'
         ];
         const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         if (httpHeaderAcceptSelected != undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
         // to determine the Content-Type header
         const consumes: string[] = [
         ];
 
         return this.httpClient.request<Array<ReturnContract>>('get',`${this.basePath}/contract/provider/${encodeURIComponent(String(contractProviderID))}/${encodeURIComponent(String(contractType))}/list`,
             {
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }
 
     /**
      * Returns the latest versions of the contracts for the account ID given for the specified contract type and provided by a specific provider
      * 
      * @param authorization Authorization
      * @param accountID accountID of the organisation
      * @param contractType contract types
      * @param contractProviderID Contract provider organisation ID
      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
      * @param reportProgress flag to report request and response progress.
      */
     public listContractsForServiceType(authorization: string, accountID: string, contractType: string, contractProviderID: string, observe?: 'body', reportProgress?: boolean): Observable<Array<ReturnContract>>;
     public listContractsForServiceType(authorization: string, accountID: string, contractType: string, contractProviderID: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ReturnContract>>>;
     public listContractsForServiceType(authorization: string, accountID: string, contractType: string, contractProviderID: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ReturnContract>>>;
     public listContractsForServiceType(authorization: string, accountID: string, contractType: string, contractProviderID: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
 
         if (authorization === null || authorization === undefined) {
             throw new Error('Required parameter authorization was null or undefined when calling listContractsForServiceType.');
         }
 
         if (accountID === null || accountID === undefined) {
             throw new Error('Required parameter accountID was null or undefined when calling listContractsForServiceType.');
         }
 
         if (contractType === null || contractType === undefined) {
             throw new Error('Required parameter contractType was null or undefined when calling listContractsForServiceType.');
         }
 
         if (contractProviderID === null || contractProviderID === undefined) {
             throw new Error('Required parameter contractProviderID was null or undefined when calling listContractsForServiceType.');
         }
 
         let headers = this.defaultHeaders;
         if (authorization !== undefined && authorization !== null) {
             headers = headers.set('Authorization', String(authorization));
         }
 
         // to determine the Accept header
         let httpHeaderAccepts: string[] = [
             'application/json'
         ];
         const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         if (httpHeaderAcceptSelected != undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
         // to determine the Content-Type header
         const consumes: string[] = [
         ];
         console.log(`${this.basePath}/contract/${encodeURIComponent(String(accountID))}/${encodeURIComponent(String(contractType))}/${encodeURIComponent(String(contractProviderID))}/list`)
         return this.httpClient.request<Array<ReturnContract>>('get',`${this.basePath}/contract/${encodeURIComponent(String(accountID))}/${encodeURIComponent(String(contractType))}/${encodeURIComponent(String(contractProviderID))}/list`,
             {
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
             
         );
     } /**
     * Get the contract for the contract ID
     * 
     * @param contractID contractId
     * @param authorization Authorization
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public fetchContract(authorization: string, contractID: string, observe?: 'body', reportProgress?: boolean): Observable<ReturnContract>;
    public fetchContract(authorization: string, contractID: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ReturnContract>>;
    public fetchContract(authorization: string, contractID: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ReturnContract>>;
    public fetchContract(authorization: string, contractID: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        
        if (authorization === null || authorization === undefined) {
            throw new Error('Required parameter authorization was null or undefined when calling listContractsForServiceType.');
        }

        if (contractID === null || contractID === undefined) {
            throw new Error('Required parameter contractID was null or undefined when calling fetchContract.');
        }

        let headers = this.defaultHeaders;
        if (authorization !== undefined && authorization !== null) {
            headers = headers.set('Authorization', String(authorization));
        }
        
        // authentication (bearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<ReturnContract>('get',`${this.basePath}/contract/${encodeURIComponent(String(contractID))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }
 
     /**
      * Returns the latest versions of the contracts for the contractProviderID given for the specified contract type and customer accountID. This is authorised by the ContractProviderID matching the organisationID in the Access Token.
      * 
      * @param contractProviderID Contract provider organisation ID
      * @param contractType contract types
      * @param accountID accountID of the customer AccountID for that contract provider
      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
      * @param reportProgress flag to report request and response progress.
      */
     public listCustomerAccountContractsForContractProviderOrganisation(contractProviderID: string, contractType: string, accountID: string, observe?: 'body', reportProgress?: boolean): Observable<Array<ReturnContract>>;
     public listCustomerAccountContractsForContractProviderOrganisation(contractProviderID: string, contractType: string, accountID: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ReturnContract>>>;
     public listCustomerAccountContractsForContractProviderOrganisation(contractProviderID: string, contractType: string, accountID: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ReturnContract>>>;
     public listCustomerAccountContractsForContractProviderOrganisation(contractProviderID: string, contractType: string, accountID: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
 
         if (contractProviderID === null || contractProviderID === undefined) {
             throw new Error('Required parameter contractProviderID was null or undefined when calling listCustomerAccountContractsForContractProviderOrganisation.');
         }
 
         if (contractType === null || contractType === undefined) {
             throw new Error('Required parameter contractType was null or undefined when calling listCustomerAccountContractsForContractProviderOrganisation.');
         }
 
         if (accountID === null || accountID === undefined) {
             throw new Error('Required parameter accountID was null or undefined when calling listCustomerAccountContractsForContractProviderOrganisation.');
         }
 
         let headers = this.defaultHeaders;
 
         // authentication (bearerAuth) required
         if (this.configuration.accessToken) {
             const accessToken = typeof this.configuration.accessToken === 'function'
                 ? this.configuration.accessToken()
                 : this.configuration.accessToken;
             headers = headers.set('Authorization', 'Bearer ' + accessToken);
         }
         // to determine the Accept header
         let httpHeaderAccepts: string[] = [
             'application/json'
         ];
         const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         if (httpHeaderAcceptSelected != undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
         // to determine the Content-Type header
         const consumes: string[] = [
         ];
 
         return this.httpClient.request<Array<ReturnContract>>('get',`${this.basePath}/contract/provider/${encodeURIComponent(String(contractProviderID))}/${encodeURIComponent(String(contractType))}/${encodeURIComponent(String(accountID))}/list`,
             {
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }
 
 }
 