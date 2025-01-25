--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Debian 16.4-1.pgdg120+2)
-- Dumped by pg_dump version 16.4 (Ubuntu 16.4-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: los
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO los;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: memberships; Type: TABLE; Schema: public; Owner: los
--

CREATE TABLE public.memberships (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    "subTitle" character varying(255),
    description text,
    amount double precision NOT NULL,
    currency character varying(255) NOT NULL,
    period integer DEFAULT 12 NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.memberships OWNER TO los;

--
-- Name: COLUMN memberships.period; Type: COMMENT; Schema: public; Owner: los
--

COMMENT ON COLUMN public.memberships.period IS 'Time period in months';


--
-- Name: permissions; Type: TABLE; Schema: public; Owner: los
--

CREATE TABLE public.permissions (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "RoleId" uuid
);


ALTER TABLE public.permissions OWNER TO los;

--
-- Name: permissions_roles; Type: TABLE; Schema: public; Owner: los
--

CREATE TABLE public.permissions_roles (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "PermissionId" uuid NOT NULL,
    "RoleId" uuid NOT NULL
);


ALTER TABLE public.permissions_roles OWNER TO los;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: los
--

CREATE TABLE public.roles (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.roles OWNER TO los;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: los
--

CREATE TABLE public.sessions (
    id uuid NOT NULL,
    session uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserId" uuid
);


ALTER TABLE public.sessions OWNER TO los;

--
-- Name: subscriptions; Type: TABLE; Schema: public; Owner: los
--

CREATE TABLE public.subscriptions (
    id uuid NOT NULL,
    amount double precision NOT NULL,
    currency character varying(255) NOT NULL,
    paid boolean DEFAULT false,
    "paymentMethod" character varying(255),
    "transactionId" character varying(255),
    status character varying(255),
    reason character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "MembershipId" uuid,
    "UserId" uuid,
    "externalTransactionId" character varying(255)
);


ALTER TABLE public.subscriptions OWNER TO los;

--
-- Name: users; Type: TABLE; Schema: public; Owner: los
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    "firstName" character varying(255) NOT NULL,
    "lastName" character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "resetToken" character varying(255),
    active boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "resetTokenExpires" timestamp with time zone
);


ALTER TABLE public.users OWNER TO los;

--
-- Data for Name: memberships; Type: TABLE DATA; Schema: public; Owner: los
--

COPY public.memberships (id, name, "subTitle", description, amount, currency, period, "createdAt", "updatedAt") FROM stdin;
d55a298d-df5a-4052-b1ef-1a8cf4981cd4	Explorer	This tier is perfect for those starting their journey in the open-source world or looking to stay informed about industry developments.	Access to open-source resources and repositories \nMonthly updates on industry news and trends \nParticipation in professional online forums \nDiscounts on training courses, webinars, and events \nOpportunity to join live sessions on requested topics	20	USD	12	2024-11-02 18:46:37.167+00	2024-11-02 18:46:37.167+00
b11c9b37-3b80-4231-b607-70de3ad5ecc6	Developer	Ideal for professionals seeking to deepen their expertise and expand their network within the open-source community.	All Explorer tier benefits \nAccess to exclusive webinars and virtual workshops \nFree or discounted entry to conferences and networking events \nPriority access to new open-source project releases \nOpportunities to contribute to high-profile open-source projects \nReduced rates for Linux certification courses	50	USD	12	2024-11-02 18:46:37.167+00	2024-11-02 18:46:37.167+00
0632d1ff-166e-4ec9-9182-e24f103a7b46	Professional	This tier is designed for individuals aiming for significant career advancement, offering tailored support and recognition.	All Professional benefits \nOne-on-one mentorship sessions with experienced IT professionals \nPersonalized career development plans and guidance \nRecognition as a Premium Member on the LOS website	100	USD	12	2024-11-02 18:46:37.167+00	2024-11-02 18:46:37.167+00
6a92d6db-cb5f-47ef-bb68-06b4e43f7eb5	Executive	For those who seek an elite experience, this tier offers unmatched access to premium resources, top-tier networking opportunities, and direct engagement with industry pioneers.	All Executive tier benefits \nExclusive live sessions with renowned instructor Sander Van Vugt \nEarly access to high-level training and certification programs \nVIP invitations to global open-source conferences and events \nPersonalized introductions to industry leaders and experts \nPriority support and direct access to the Foundation’s leadership team	200	USD	12	2024-11-02 18:46:37.167+00	2024-11-02 18:46:37.167+00
\.


--
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: los
--

COPY public.permissions (id, name, description, "createdAt", "updatedAt", "RoleId") FROM stdin;
\.


--
-- Data for Name: permissions_roles; Type: TABLE DATA; Schema: public; Owner: los
--

COPY public.permissions_roles ("createdAt", "updatedAt", "PermissionId", "RoleId") FROM stdin;
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: los
--

COPY public.roles (id, name, description, "createdAt", "updatedAt") FROM stdin;
dd929e17-5f86-473d-862f-3deca556dd7a	platform-admin	Platform Admin	2024-11-02 18:46:36.566+00	2024-11-02 18:46:36.566+00
1319ff15-fdef-44be-a6b7-ba5599e84de1	admin	Admin	2024-11-02 18:46:36.566+00	2024-11-02 18:46:36.566+00
2776e04c-acb0-428d-a0ed-1a8830a803b2	user	User	2024-11-02 18:46:36.566+00	2024-11-02 18:46:36.566+00
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: los
--

COPY public.sessions (id, session, "createdAt", "updatedAt", "UserId") FROM stdin;
5e00c9c7-9e8d-41c3-886b-e7b68dc9995c	2f0d5c3e-d617-4348-a1d3-d30aa3048108	2024-10-31 11:32:06.991+00	2024-10-31 11:32:06.991+00	\N
5d935838-0d16-40a9-8cbc-82d99794a699	99f8ef69-3ffb-45e9-8ffd-c2c3f5d19e27	2024-10-31 11:34:34.294+00	2024-10-31 11:34:34.294+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
a58b27ba-4a35-4e78-9fcf-322615bc919c	412b9833-8107-448c-90ba-7c3eca30d143	2024-10-31 11:36:39.895+00	2024-10-31 11:36:39.895+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
64b7888e-fa26-47f7-be9b-6a80045e2f09	88dcef26-aa74-4ec0-8c36-c9163e4f3f2a	2024-10-31 13:35:40.811+00	2024-10-31 13:35:40.811+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
4d382e2f-ad21-410b-9bd8-b0c52ef31645	de19df0a-b89f-49a6-add7-27b1274ac3f8	2024-10-31 13:37:34.598+00	2024-10-31 13:37:34.598+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
12a43503-933a-4894-8014-188893feeb87	e0d67af1-b0a3-46be-bec9-1f2929009905	2024-10-31 16:18:56.247+00	2024-10-31 16:18:56.247+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
0d96336b-6798-43c7-880d-e70925f9c431	aae3ae7a-84a0-4985-be3e-f3face1b6fff	2024-10-31 18:33:36.555+00	2024-10-31 18:33:36.555+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
e899d8f4-7d04-41f4-82cd-71be36ad5247	cdf5225b-e880-46dc-9016-371156bd6fa8	2024-11-01 00:20:37.779+00	2024-11-01 00:20:37.779+00	4200fd0b-605b-416e-aee0-38b679b3ca17
ab1175ef-ff56-421d-a46a-617fdefaa77b	149af33e-8a90-4e54-847c-8cae28fc85fa	2024-11-01 01:41:35.089+00	2024-11-01 01:41:35.089+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
db9ad829-d65a-44b2-b22b-e2420c54d231	f0429750-4b85-44be-83b5-67a63b979a64	2024-11-01 07:34:39.38+00	2024-11-01 07:34:39.38+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
34491e02-eaec-42e6-84d9-e3ce6d286845	99b6d7a1-a9e5-4c96-8fbf-315e097949b4	2024-11-01 18:00:19.529+00	2024-11-01 18:00:19.529+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
5589ccbb-d67d-4fc5-b0ea-6b84e9ccad58	584f2e22-3236-468c-9939-516d17f4b21e	2024-11-02 11:52:11.303+00	2024-11-02 11:52:11.303+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
90de4bde-717e-4d3c-b8f4-a42d887b5d7c	1ab65192-bfc2-4980-81ce-94e14962c47d	2024-11-02 18:36:45.748+00	2024-11-02 18:36:45.748+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
1e3f6eb2-53ca-449d-be09-7f13f81af76f	ec909cab-9077-4f5d-a6f3-b22ae82fca2c	2024-11-02 18:50:57.446+00	2024-11-02 18:50:57.446+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
f59f064f-053b-4c65-b73d-315cec180ffb	f29eb494-a86d-4b5b-9e21-dbbbbd1fde2f	2024-11-03 03:48:57.215+00	2024-11-03 03:48:57.215+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
79494291-f39d-4e07-acc4-8fa8d4547492	44da3128-af04-40c9-95e7-2e842af86caa	2024-11-03 10:51:51.927+00	2024-11-03 10:51:51.927+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
cb97ff3c-d091-43b0-a451-e9e52101e6d5	37c5ecf8-7f3d-4903-b881-5b37d4466585	2024-11-03 11:38:34.299+00	2024-11-03 11:38:34.299+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
4663cf83-d3e6-405e-b497-93f8512a5c09	1dbb62a5-a1f6-418b-aece-d795fba1dcf0	2024-11-03 12:18:42.897+00	2024-11-03 12:18:42.897+00	aaac999e-77ad-49de-b6e7-7d1dba3f12b1
898872ec-fd5d-48c1-ad61-58377b705883	813aa954-2093-49cf-a6be-3d068df224e1	2024-11-03 12:36:27.799+00	2024-11-03 12:36:27.799+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
013cb0ec-2188-4b81-9140-42df469705dd	4dc88e4b-02c0-4271-8b3d-9edd5b8995d8	2024-11-03 13:58:25.159+00	2024-11-03 13:58:25.159+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
e083316e-e593-4016-a3d3-1c61972202ca	5b0e0cfc-be0a-4ccb-8751-466005ad0a47	2024-11-03 15:49:35.675+00	2024-11-03 15:49:35.675+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
4d7a8723-c343-4aa9-81ba-42d53eb9325c	d928d474-5660-48ef-9147-21fb2149d03c	2024-11-03 15:49:36.171+00	2024-11-03 15:49:36.171+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
df41b90d-d347-4d2f-ba3d-a8e629591307	35185cbd-2c22-4878-acf7-0f58b5b6087e	2024-11-03 18:01:57.612+00	2024-11-03 18:01:57.612+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
daa05daa-c2b2-4fd8-a661-5dc2afff3082	61e05a5a-961c-4556-9201-df5880d37f01	2024-11-03 18:17:47.533+00	2024-11-03 18:17:47.533+00	aaac999e-77ad-49de-b6e7-7d1dba3f12b1
59dd4468-09a9-4338-8e97-19d9e8787863	e96c084a-d8b7-4c25-9d38-a1d3f6e97009	2024-11-04 06:20:31.083+00	2024-11-04 06:20:31.083+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
e299bade-1af9-4f0c-8ac2-6dbce8fb327c	90bdc72e-22ca-4492-b86a-27d2f61b3cff	2024-11-04 08:50:28.885+00	2024-11-04 08:50:28.885+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
38f4829c-1f3c-4f31-a451-0c59848e9b2c	47455d79-5f04-4ed9-81b9-5a6261aa8fa1	2024-11-04 17:00:08.901+00	2024-11-04 17:00:08.901+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
54c16080-6ec7-4f4c-aecb-593e5879b261	1ea9f49c-0d24-481a-ac70-0019c36241b8	2024-11-04 17:40:51.896+00	2024-11-04 17:40:51.896+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
7151c130-ae43-4fa1-946f-0515d19aaacd	b22a2392-95a9-4def-9c45-9632868bde0e	2024-11-05 11:08:49.033+00	2024-11-05 11:08:49.033+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
ba005af3-9ee1-4df5-b16f-758f682771f7	ad1015ad-278b-4924-b6fa-ab9f933ebdc9	2024-11-05 16:04:30.764+00	2024-11-05 16:04:30.764+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
4601a043-b6b6-441e-9953-10b8b966cfb0	34435f50-9262-4599-b7f1-e0d71e99570b	2024-11-05 16:17:35.654+00	2024-11-05 16:17:35.654+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
44b9dd5d-928e-4978-a9d8-a59e4089eca1	c1d58c51-0b68-44f3-b69e-b187af179120	2024-11-05 22:26:04.496+00	2024-11-05 22:26:04.496+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
7fe608e5-f991-4716-883e-1a2be9191fb8	b1f0231e-0b01-4f25-bb01-c8d4a6e6c9c3	2024-11-06 05:07:24.432+00	2024-11-06 05:07:24.432+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
9ab60bc7-1943-4dd4-bef0-c892f1c4efb8	afe437d6-9c95-4686-9911-4e7b5bce03bb	2024-11-06 06:37:11.21+00	2024-11-06 06:37:11.21+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
2178af8e-2209-4872-8e7f-7a29f6c4e585	2b181dd8-fd0e-4b1b-a3d3-997e1a4e87e0	2024-11-06 06:38:09.425+00	2024-11-06 06:38:09.425+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
ba9e3a85-27c9-4a32-b8a2-cb0f30ecaf20	e0a8569b-d9c8-4b67-aa0f-07fda7656368	2024-11-06 15:10:57.27+00	2024-11-06 15:10:57.27+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
d17045e9-9ba3-41ca-9680-f105ca8ae41f	5dbbd4eb-2e2f-4852-be08-5381eb7bf6c4	2024-11-07 11:59:18.584+00	2024-11-07 11:59:18.584+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
56428436-57d9-4541-9b75-76848177a30f	e495d403-b0b3-4f1d-92ca-5f071315f3bf	2024-11-07 14:49:06.918+00	2024-11-07 14:49:06.918+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
d7e6f1ac-8e6a-42af-94f5-66b24316c9e0	fef57586-c100-4990-a6b1-059ff6595f0b	2024-11-07 14:56:35.91+00	2024-11-07 14:56:35.91+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
787a4b1b-0400-4438-bb31-188a8c208f2d	10251996-6342-487e-a967-2f66888d566e	2024-11-07 16:39:11.321+00	2024-11-07 16:39:11.321+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
1ea879b9-846f-4baa-88e5-6eb3632a9bdf	51b68079-1e6e-4ef2-be64-8d62b04d476d	2024-11-07 16:39:12.521+00	2024-11-07 16:39:12.521+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
7a85e955-d3e3-4006-a6c4-5709bd214958	145a05c3-04a1-4cde-8a46-97f9570761c3	2024-11-08 06:54:01.858+00	2024-11-08 06:54:01.858+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
2b145677-58a1-4c12-a7ec-1685d6a97ef4	6807c5ca-0393-44b8-b367-9e60578958d8	2024-11-08 13:04:08.259+00	2024-11-08 13:04:08.259+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
187a65f3-c905-4a51-a215-fd90e4a52884	57590a20-b5c2-4b2f-8b1e-35d403ca8a0c	2024-11-11 14:00:34.234+00	2024-11-11 14:00:34.234+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
4067f867-ee96-46e7-ac3d-b1d59dbd6b5c	e4276e21-6539-4a67-9a0d-31204fc0bedf	2024-11-11 14:06:48.538+00	2024-11-11 14:06:48.538+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
4ea3fca9-41f2-4a2e-a1e0-8b300f500c9a	ed4026c0-bb49-4934-9b8b-0dae215d5c19	2024-11-13 05:30:06.994+00	2024-11-13 05:30:06.994+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
5fd1fd73-d22c-4710-a73f-d446f5d597fa	b911c380-4b56-4d98-b684-1b8e2bed9c86	2024-11-13 10:36:44.364+00	2024-11-13 10:36:44.364+00	67573251-a52d-4e15-b02c-69bec7fb5151
44475024-6a4a-4b9b-80ed-b5c6b27bbd3c	62cf42fb-30bc-4231-a28e-d36a0033cf75	2024-11-13 13:50:20.211+00	2024-11-13 13:50:20.211+00	a56877ce-6f01-4baf-895e-bb1f578722a0
e3065f83-da49-4186-bb69-10060f9a5ee1	8d5ab550-31c4-466b-8100-a18871d14442	2024-11-16 22:08:20.129+00	2024-11-16 22:08:20.129+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
fbde92f4-d4d9-4d35-96b7-2aa9ef0714cd	7ccc072e-f452-45d3-ad31-496b0b19ae8d	2024-11-17 00:53:00.139+00	2024-11-17 00:53:00.139+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
47e9d0a2-0bac-4b50-8877-73efa61119ca	e3d91bea-f5b8-43b2-9908-c39660e9b7fa	2024-11-17 15:38:34.424+00	2024-11-17 15:38:34.424+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
948af088-738c-42d2-98d9-625c222f5f02	628a4161-6303-4fc4-b0ae-b60a84c4df66	2024-11-17 18:33:17.604+00	2024-11-17 18:33:17.604+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
57223a7c-3396-4d0c-a24e-2c29939d2a69	05556df9-0e78-4cf2-80a6-3e7ae615ea41	2024-11-17 23:31:44.37+00	2024-11-17 23:31:44.37+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
cc081b5a-cc91-4608-b4d1-812da3cbf11d	a32eb343-7b55-4344-a5f2-3c0a22a881aa	2024-11-17 23:59:47.94+00	2024-11-17 23:59:47.94+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
71ca8b2e-1a6c-4bd1-b4d3-63bd13506780	ff737682-df62-47ee-a8d5-6b343c37afd6	2024-11-18 06:17:06.827+00	2024-11-18 06:17:06.827+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
2b7bd250-68de-4eea-9af8-f233d081c143	982a7f54-0fa5-426b-a93c-84515ac9f949	2024-11-18 08:41:56.044+00	2024-11-18 08:41:56.044+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
85be3b0e-2a7e-4916-be44-2567507a2431	9d5144c8-b96e-4225-b1fe-d4c717b83da5	2024-11-18 08:46:29.238+00	2024-11-18 08:46:29.238+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
c1881696-642c-48f7-b341-a10b15f19d35	57b22b08-39ec-4466-bb9f-016a8b4eda85	2024-11-23 14:02:51.392+00	2024-11-23 14:02:51.392+00	a56877ce-6f01-4baf-895e-bb1f578722a0
ee350727-3ec2-467f-b9e8-d5e8aa8b6c96	4858b334-bfa0-4337-a27a-1542773e351a	2024-11-23 20:30:34.742+00	2024-11-23 20:30:34.742+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
c4b00cef-2336-408f-b703-40467a27d41e	8735ca13-7fbe-462b-a070-216aeff990c5	2024-11-24 09:16:51.291+00	2024-11-24 09:16:51.291+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
33a560c1-a6f3-413d-97f7-826438425ee4	3d916052-f4f0-481a-afdd-94c4a4de6ca9	2024-11-24 11:27:51.201+00	2024-11-24 11:27:51.201+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
c3dba136-ac80-41c0-8dd5-4e11482b9e4b	fcd716bd-3d30-42cc-b809-a2c4a50fe95f	2024-11-25 05:40:23.26+00	2024-11-25 05:40:23.26+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
1cda4c97-55fe-449d-b3a1-757e9fac71cc	247af31f-00d1-4480-a6dc-ecb305e2d178	2024-11-25 15:55:15.641+00	2024-11-25 15:55:15.641+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
022b99c3-b527-4ca9-a748-f54ae109afde	426213f4-91d3-420d-aa3b-b8390b20903b	2024-11-27 06:12:52.3+00	2024-11-27 06:12:52.3+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
9b42b781-1f5e-4750-99f6-69dde4b8ff89	d7b0414f-8f9d-41bb-adf3-634c017b4743	2024-11-27 07:24:28.145+00	2024-11-27 07:24:28.145+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
62780cc4-88ac-4ad7-86b4-f452219a93b0	e15866df-0315-41fd-aa0f-715f83396106	2024-11-27 10:59:53.942+00	2024-11-27 10:59:53.942+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
0592e58c-a8ef-4dc6-a505-7bd7ec92680e	308f03ef-e41f-4d7a-a1a5-13b863c6dd31	2024-11-27 11:05:21.96+00	2024-11-27 11:05:21.96+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
5126ee63-cc1c-4a75-ab73-1c14c2bf542a	062a437e-d11b-4f17-ae3b-90173df4d33a	2024-11-30 00:19:05.351+00	2024-11-30 00:19:05.351+00	a70aae6c-1bf0-4ca9-94b6-2b480f0da505
\.


--
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: los
--

COPY public.subscriptions (id, amount, currency, paid, "paymentMethod", "transactionId", status, reason, "createdAt", "updatedAt", "MembershipId", "UserId", "externalTransactionId") FROM stdin;
f9bc49ec-0005-4b11-82b5-35b4b7c196f6	20	USD	f	DPO	2e7fe99b-a0f1-4700-89ca-07037affe1c5	failed	membership subscription fees	2024-11-03 10:52:44+00	2024-11-03 16:03:19.92+00	d55a298d-df5a-4052-b1ef-1a8cf4981cd4	a70aae6c-1bf0-4ca9-94b6-2b480f0da505	99E412AB-7E23-4E31-B6D6-65E61E792666
2172767a-4fbb-4129-86db-4b58ffc6e971	20	USD	f	DPO	e9e164b4-2535-4cf9-a9cd-c02756c4f096	failed	membership subscription fees	2024-11-03 12:18:59.692+00	2024-11-03 17:30:02.941+00	d55a298d-df5a-4052-b1ef-1a8cf4981cd4	aaac999e-77ad-49de-b6e7-7d1dba3f12b1	49FD67CC-5194-4AEB-9200-6FAAF68AD8F5
6f083175-5208-4752-b2d0-001de689c152	20	USD	f	DPO	a17c9d3f-c368-4117-b143-200a4e1383b8	failed	membership subscription fees	2024-11-13 13:50:54.16+00	2024-11-14 13:09:11.866+00	d55a298d-df5a-4052-b1ef-1a8cf4981cd4	a56877ce-6f01-4baf-895e-bb1f578722a0	037C90D9-BDE5-4163-AB80-08939BE8806B
1031345c-7190-4a7e-bc84-a6cddb09fd87	200	USD	f	DPO	7c9d23b8-bbc9-4908-ac8b-c7ddd38baabf	failed	membership subscription fees	2024-11-05 16:04:49.836+00	2024-11-05 16:19:37.081+00	6a92d6db-cb5f-47ef-bb68-06b4e43f7eb5	a70aae6c-1bf0-4ca9-94b6-2b480f0da505	\N
869f53db-2f89-4af9-a935-e64f7494daad	200	USD	f	DPO	f3f01624-7a01-447b-b7dc-75e18de5c0cb	failed	membership subscription fees	2024-11-05 16:05:12.648+00	2024-11-05 16:19:37.083+00	6a92d6db-cb5f-47ef-bb68-06b4e43f7eb5	a70aae6c-1bf0-4ca9-94b6-2b480f0da505	\N
2a5ce010-8d7d-4d4e-a7ff-12f00349908b	100	USD	f	DPO	6bc1c33a-2de6-430b-b724-eff7ba2318ba	failed	membership subscription fees	2024-11-05 16:18:10.49+00	2024-11-05 16:19:37.674+00	0632d1ff-166e-4ec9-9182-e24f103a7b46	a70aae6c-1bf0-4ca9-94b6-2b480f0da505	\N
45b24f5b-4de0-4b35-b0c8-29dce9680a96	50	USD	f	DPO	23e4f71f-bd34-4028-9bb3-6d0bdc703539	failed	membership subscription fees	2024-11-05 16:18:26.69+00	2024-11-05 16:19:37.677+00	b11c9b37-3b80-4231-b607-70de3ad5ecc6	a70aae6c-1bf0-4ca9-94b6-2b480f0da505	\N
f6705870-6ed0-40e3-b02b-f46d380dd62c	50	USD	f	DPO	dd2d57d4-663a-483d-8c67-2c925f56e41f	failed	membership subscription fees	2024-11-05 16:21:13.044+00	2024-11-05 16:25:42.506+00	b11c9b37-3b80-4231-b607-70de3ad5ecc6	a70aae6c-1bf0-4ca9-94b6-2b480f0da505	\N
13daa454-821e-428b-b996-94cf80d68b39	200	USD	f	DPO	21e7a8b8-bb22-4e30-8002-c56add29f82c	failed	membership subscription fees	2024-11-05 19:30:21.934+00	2024-11-05 19:45:01.202+00	6a92d6db-cb5f-47ef-bb68-06b4e43f7eb5	a70aae6c-1bf0-4ca9-94b6-2b480f0da505	\N
723c1122-452c-4eb6-9c38-b4402460830d	100	USD	f	DPO	ffe0c802-fc48-4f6d-8177-e7c4321b124e	failed	membership subscription fees	2024-11-05 19:40:50.178+00	2024-11-05 19:45:01.207+00	0632d1ff-166e-4ec9-9182-e24f103a7b46	a70aae6c-1bf0-4ca9-94b6-2b480f0da505	\N
164c90d1-e854-4ec5-b777-5e72d79643ce	100	USD	f	DPO	865e6779-1791-41c5-9d80-db48d9436477	failed	membership subscription fees	2024-11-05 19:41:53.048+00	2024-11-05 19:45:01.209+00	0632d1ff-166e-4ec9-9182-e24f103a7b46	a70aae6c-1bf0-4ca9-94b6-2b480f0da505	\N
84c5c263-c17e-4782-9e0f-a3901352b93b	20	USD	f	DPO	a5726cd3-3b51-4278-9f23-d5431af28661	failed	membership subscription fees	2024-11-05 16:10:56.523+00	2024-11-05 21:15:01.231+00	d55a298d-df5a-4052-b1ef-1a8cf4981cd4	a70aae6c-1bf0-4ca9-94b6-2b480f0da505	B59B24F1-4579-43F8-9C2F-81A5CF6185C5
6256046b-0da8-4861-8a5c-18b6eb11dc79	200	USD	f	DPO	400b605d-6bf0-4193-84b8-c8218d8682e9	failed	membership subscription fees	2024-11-05 22:37:51.001+00	2024-11-05 22:45:01.287+00	6a92d6db-cb5f-47ef-bb68-06b4e43f7eb5	a70aae6c-1bf0-4ca9-94b6-2b480f0da505	\N
0b23fff8-fdc4-4653-8eb1-02344180ead4	100	USD	f	DPO	0ba73dfd-120a-4348-90d8-5446d5449dc0	failed	membership subscription fees	2024-11-05 22:41:23.766+00	2024-11-05 22:45:01.487+00	0632d1ff-166e-4ec9-9182-e24f103a7b46	a70aae6c-1bf0-4ca9-94b6-2b480f0da505	\N
c90e4f6e-1b4b-4e44-a60f-f0ed94b51cd4	20	USD	f	DPO	b4911cbc-a2bf-4294-865e-3de7d1adc37a	failed	membership subscription fees	2024-11-05 22:36:25.207+00	2024-11-06 05:08:41.315+00	d55a298d-df5a-4052-b1ef-1a8cf4981cd4	a70aae6c-1bf0-4ca9-94b6-2b480f0da505	3AB6696C-7C14-416B-9A01-6FA29073886D
1292b356-dbca-42d9-b753-c086b394902e	200	USD	f	DPO	c0183546-e084-4aa1-82d6-7e7f94255c97	failed	membership subscription fees	2024-11-06 06:38:42.33+00	2024-11-06 06:40:01.213+00	6a92d6db-cb5f-47ef-bb68-06b4e43f7eb5	a70aae6c-1bf0-4ca9-94b6-2b480f0da505	\N
6f9e6075-5c8f-4533-8afb-04d40e83471d	200	USD	f	DPO	af644751-4083-466b-8f4c-5e33e35f07c2	failed	membership subscription fees	2024-11-07 11:59:33.054+00	2024-11-07 17:10:01.574+00	6a92d6db-cb5f-47ef-bb68-06b4e43f7eb5	a70aae6c-1bf0-4ca9-94b6-2b480f0da505	90A0134A-5E64-47D6-AA52-EEA670C303DC
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: los
--

COPY public.users (id, "firstName", "lastName", email, password, "resetToken", active, "createdAt", "updatedAt", "resetTokenExpires") FROM stdin;
4200fd0b-605b-416e-aee0-38b679b3ca17	Santos	Venter	santosventer@gmail.com	$2b$10$tBvl38KdFGFPQ.5ahTB6oeRCuXgsBZzjb.LIGSIKbFgnrNKDhruHu	\N	t	2024-11-01 00:20:37.486+00	2024-11-01 00:20:37.486+00	\N
aaac999e-77ad-49de-b6e7-7d1dba3f12b1	Santos	Venter	santos.chibenga@livingopensource.org	$2b$10$RBVODrHCu8vQUxJytqP2xOd48dCOzO5VESE3nJtv4i5LSP6.4cg52	\N	t	2024-11-03 12:18:42.805+00	2024-11-03 12:18:42.805+00	\N
67573251-a52d-4e15-b02c-69bec7fb5151	Brenda	Kok	brenda@sparklingprofessionals.com	$2b$10$IxgD/./BpwDPzPmtgBgG7ejOSko8uMeaQ.Rgj/45QqL4.ejCWMyJ.	\N	t	2024-11-13 10:36:44.153+00	2024-11-13 10:36:44.153+00	\N
a56877ce-6f01-4baf-895e-bb1f578722a0	Jonathan	Banda	jonathan@osystems.africa	$2b$10$zedcaGIH6bOGk.4vFvNRzO3gc5Yacuwf/uWLBeEhXpUTbQl.XAfbu	\N	t	2024-11-13 13:50:19.987+00	2024-11-13 13:50:19.987+00	\N
a70aae6c-1bf0-4ca9-94b6-2b480f0da505	Arthur	Kalikiti	arthur.kalikiti@livingopensource.org	$2b$10$TfeUaVPzws8iH1jde8VA1OzuuVi56QYuThg6XRjH2gwTuKMfDLvX2	3uyab9fv4zsz45rqanwiga	t	2024-10-31 11:32:06.891+00	2024-11-24 09:52:45.226+00	2024-11-24 10:22:45.219+00
\.


--
-- Name: memberships memberships_pkey; Type: CONSTRAINT; Schema: public; Owner: los
--

ALTER TABLE ONLY public.memberships
    ADD CONSTRAINT memberships_pkey PRIMARY KEY (id);


--
-- Name: permissions permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: los
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);


--
-- Name: permissions_roles permissions_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: los
--

ALTER TABLE ONLY public.permissions_roles
    ADD CONSTRAINT permissions_roles_pkey PRIMARY KEY ("PermissionId", "RoleId");


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: los
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: los
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: subscriptions subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: los
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: los
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_email_key1; Type: CONSTRAINT; Schema: public; Owner: los
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key1 UNIQUE (email);


--
-- Name: users users_email_key2; Type: CONSTRAINT; Schema: public; Owner: los
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key2 UNIQUE (email);


--
-- Name: users users_email_key3; Type: CONSTRAINT; Schema: public; Owner: los
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key3 UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: los
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: permissions permissions_RoleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: los
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT "permissions_RoleId_fkey" FOREIGN KEY ("RoleId") REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: permissions_roles permissions_roles_PermissionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: los
--

ALTER TABLE ONLY public.permissions_roles
    ADD CONSTRAINT "permissions_roles_PermissionId_fkey" FOREIGN KEY ("PermissionId") REFERENCES public.permissions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: permissions_roles permissions_roles_RoleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: los
--

ALTER TABLE ONLY public.permissions_roles
    ADD CONSTRAINT "permissions_roles_RoleId_fkey" FOREIGN KEY ("RoleId") REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sessions sessions_UserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: los
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: subscriptions subscriptions_MembershipId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: los
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT "subscriptions_MembershipId_fkey" FOREIGN KEY ("MembershipId") REFERENCES public.memberships(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: subscriptions subscriptions_UserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: los
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT "subscriptions_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES TO los;


--
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES TO los;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS TO los;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES TO los;


--
-- PostgreSQL database dump complete
--

