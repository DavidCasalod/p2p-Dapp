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
 */
import { ContractBusinessParameters } from './contractBusinessParameters';

/**
 * The contract claims to be issued in the Contract VC
 */
export interface ContractOffer { 
    businessParameters?: ContractBusinessParameters;
    /**
     * Contract claims specific to a Service User.
     */
    serviceParameters?: any;
    dataParameters?: Array<any>;
}