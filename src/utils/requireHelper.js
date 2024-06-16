import express from "express";
import httpContext from "express-http-context";
import mongoose from "mongoose";
import _ from "lodash";
import joi from "joi";
import jwt from "jsonwebtoken";
import aws from "@aws-sdk/client-s3";
import multer from "multer";
import { v4 as uuid } from "uuid";

const app = express();

export { app, express, httpContext, mongoose, _, joi, jwt, aws, multer, uuid };
