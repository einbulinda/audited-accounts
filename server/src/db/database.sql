CREATE DATABASE annual_accounts;

SET
    search_path TO public;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" SCHEMA public;

-- SYSTEM USERS
CREATE TABLE users(
    user_id uuid DEFAULT uuid_generate_v4(),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (user_id)
);

--COMPANY PROFILE
CREATE TABLE business_profile(
    biz_id SERIAL,
    biz_name VARCHAR(255) NOT NULL,
    kra_pin VARCHAR(255) UNIQUE NOT NULL,
    biz_type VARCHAR(120) NOT NULL DEFAULT 'IT2C',
    year_end INT NOT NULL,
    shares INT,
    paid_shares INT,
    nominal_val INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by uuid,
    updated_at TIMESTAMP,
    updated_by uuid,
    PRIMARY KEY(biz_id),
    FOREIGN KEY(created_by) REFERENCES users(user_id),
    FOREIGN KEY(updated_by) REFERENCES users(user_id)
);

--COMPANY ADDRESS
CREATE TABLE company_address(
    address_id SERIAL,
    postal_address INT NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    town VARCHAR(255),
    business SERIAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by uuid,
    updated_at TIMESTAMP,
    updated_by uuid,
    PRIMARY KEY(address_id),
    FOREIGN KEY(business) REFERENCES business_profile(biz_id),
    FOREIGN KEY(created_by) REFERENCES users(user_id),
    FOREIGN KEY(updated_by) REFERENCES users(user_id)
);

--COMPANY BANKERS
CREATE TABLE company_bankers(
    banker_id SERIAL,
    bank_name VARCHAR(255) NOT NULL,
    branch VARCHAR(255) NOT NULL,
    postal_address INT NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    town VARCHAR(255) NOT NULL,
    business SERIAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by uuid,
    updated_at TIMESTAMP,
    updated_by uuid,
    PRIMARY KEY(banker_id),
    FOREIGN KEY(business) REFERENCES business_profile(biz_id),
    FOREIGN KEY(created_by) REFERENCES users(user_id),
    FOREIGN KEY(updated_by) REFERENCES users(user_id)
);

--AUDITOR DETAILS
CREATE TABLE auditor_profile(
    auditor_id SERIAL,
    auditor_name VARCHAR(255) NOT NULL,
    postal_address INT NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    town VARCHAR(255) NOT NULL,
    business SERIAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by uuid,
    updated_at TIMESTAMP,
    updated_by uuid,
    PRIMARY KEY(auditor_id),
    FOREIGN KEY(business) REFERENCES business_profile(biz_id),
    FOREIGN KEY(created_by) REFERENCES users(user_id),
    FOREIGN KEY(updated_by) REFERENCES users(user_id)
);

--VAT RETURNS INFO
CREATE TABLE vat_returns(
    _id SERIAL,
    business SERIAL,
    is_vatable BOOLEAN NOT NULL DEFAULT 'true',
    gen_rate_sales INT,
    other_rate_sales INT,
    zero_rate_sales INT,
    exempt_sales INT,
    gen_purchases INT,
    other_rate_purchases INT,
    zero_rate_purchases INT,
    exempt_purchases INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by uuid,
    updated_at TIMESTAMP,
    updated_by uuid,
    PRIMARY KEY(_id),
    FOREIGN KEY(business) REFERENCES business_profile(biz_id),
    FOREIGN KEY(created_by) REFERENCES users(user_id),
    FOREIGN KEY(updated_by) REFERENCES users(user_id)
);

-- FIXED ASSETS
CREATE TABLE fixed_assets(
    _id SERIAL created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    --ADDITIONAL COLUMNS TO BE ADDED
    created_by uuid,
    updated_at TIMESTAMP,
    updated_by uuid,
    PRIMARY KEY(_id),
    FOREIGN KEY(created_by) REFERENCES users(user_id),
    FOREIGN KEY(updated_by) REFERENCES users(user_id)
);

--DEPRECIATION RATES
CREATE TABLE wta_rates(
    _id SERIAL created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    --ADDITIONAL COLUMNS TO BE ADDED
    created_by uuid,
    updated_at TIMESTAMP,
    updated_by uuid,
    PRIMARY KEY(_id),
    FOREIGN KEY(created_by) REFERENCES users(user_id),
    FOREIGN KEY(updated_by) REFERENCES users(user_id)
);

-- EXPENSES
CREATE TABLE expenses(
    _id SERIAL created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    --ADDITIONAL COLUMNS TO BE ADDED
    created_by uuid,
    updated_at TIMESTAMP,
    updated_by uuid,
    PRIMARY KEY(_id),
    FOREIGN KEY(created_by) REFERENCES users(user_id),
    FOREIGN KEY(updated_by) REFERENCES users(user_id)
);

--PAYE RETURNS
CREATE TABLE paye_returns(
    _id SERIAL created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    --ADDITIONAL COLUMNS TO BE ADDED
    created_by uuid,
    updated_at TIMESTAMP,
    updated_by uuid,
    PRIMARY KEY(_id),
    FOREIGN KEY(created_by) REFERENCES users(user_id),
    FOREIGN KEY(updated_by) REFERENCES users(user_id)
);

--INSTALLMENT TAXES
CREATE TABLE installment_tax(
    _id SERIAL created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    --ADDITIONAL COLUMNS TO BE ADDED
    created_by uuid,
    updated_at TIMESTAMP,
    updated_by uuid,
    PRIMARY KEY(_id),
    FOREIGN KEY(created_by) REFERENCES users(user_id),
    FOREIGN KEY(updated_by) REFERENCES users(user_id)
);

-- WHT TAXES
CREATE TABLE witholding_tax(
    _id SERIAL created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    --ADDITIONAL COLUMNS TO BE ADDED
    created_by uuid,
    updated_at TIMESTAMP,
    updated_by uuid,
    PRIMARY KEY(_id),
    FOREIGN KEY(created_by) REFERENCES users(user_id),
    FOREIGN KEY(updated_by) REFERENCES users(user_id)
);

--ADVANCE PAYMENTS
CREATE TABLE advance_payments(
    _id SERIAL created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    --ADDITIONAL COLUMNS TO BE ADDED
    created_by uuid,
    updated_at TIMESTAMP,
    updated_by uuid,
    PRIMARY KEY(_id),
    FOREIGN KEY(created_by) REFERENCES users(user_id),
    FOREIGN KEY(updated_by) REFERENCES users(user_id)
);