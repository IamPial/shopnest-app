--
-- PostgreSQL database dump
--

\restrict QfuCifudbg86e0gKSIeUGL9wc1GrkW8NXkZ7dLmHZQKabm20kPJHZPZKSvDVs1q

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('6ad4a83b-aa09-4ac1-ab86-bfa0570b0d2f', '9f356e6e9db197627cd8c508fd2bc4a83141d8d4ea2a87fba9b67b23b51fc9f2', '2026-08-11 12:17:32.097635+06', '20260811061732_init', NULL, NULL, '2026-08-11 12:17:32.043636+06', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('c363061b-c921-4c99-b229-de94b9172517', 'dc832304f9c7f75a801432e334f6840cb87406fd8b80bf366df07f80df79e73b', '2026-08-12 02:44:34.020712+06', '20260811204433_update', NULL, NULL, '2026-08-12 02:44:33.901255+06', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('903b7050-9d35-47c1-9062-4aaafacadde1', '45e6b75c10f55f13f729255ed703aefd886766de0f5083cc42f451e33f4abc23', '2026-08-12 08:38:03.797973+06', '20260812023803_update', NULL, NULL, '2026-08-12 08:38:03.773371+06', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('f7606a09-2c9f-407a-9a49-fde22fdf3ede', '5cc725ab664ec85cb191eeaa234a3d294d5833ba113ae0d329e2af22675d9ee2', '2026-08-12 09:07:36.703763+06', '20260812030736_update', NULL, NULL, '2026-08-12 09:07:36.696406+06', 1);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categories (id, name, "isDelete", "createdAt", "updatedAt") VALUES ('8b1e9a06-edb1-4a6c-bba6-697edc9c1669', 'Electronics', false, '2026-08-11 08:46:49.198', '2026-08-11 08:46:49.198');
INSERT INTO public.categories (id, name, "isDelete", "createdAt", "updatedAt") VALUES ('d17bb2a9-5929-4bc5-9ee6-e266dcfe3015', 'Home & Kitchen', false, '2026-08-11 08:49:19.087', '2026-08-11 08:49:19.087');
INSERT INTO public.categories (id, name, "isDelete", "createdAt", "updatedAt") VALUES ('4f4f989c-3f5b-4e1f-89ca-9b97e3b1a4a5', 'Beauty & Personal Care', false, '2026-08-11 10:33:24.129', '2026-08-11 10:33:24.129');
INSERT INTO public.categories (id, name, "isDelete", "createdAt", "updatedAt") VALUES ('ab4fb3c0-4245-4cc7-bc4e-f8ea019f2a05', 'Daily Essentials & Groceries', false, '2026-08-11 10:33:58.237', '2026-08-11 10:33:58.237');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (id, name, email, password, "createdAt", "updatedAt", "isDeleted", role) VALUES ('a7fba332-8c8e-4350-ba96-e826a2abb039', 'Ayesha Rahman', 'ayesha@example.com', '$2b$10$fSLDIX96eY3ouvcsjS2I1.H4Pr/CVtYXzVeyNHyuy9G9klTmG.3dy', '2026-08-11 19:05:50.393', '2026-08-11 19:05:50.393', false, 'CUSTOMER');
INSERT INTO public.users (id, name, email, password, "createdAt", "updatedAt", "isDeleted", role) VALUES ('66ec504e-5d15-4b8b-84d9-2002ca114d0d', 'Abdullah Al Murad', 'murad@example.com', '$2b$10$ezORxIJWSZqm28QF0ZEr2OJbgPu/bUnqKyJmcHesxIhkgNul2wivC', '2026-08-12 02:55:27.377', '2026-08-12 02:55:27.377', false, 'CUSTOMER');


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.orders (id, "userId", "createdAt", "updatedAt", "totalAmount") VALUES ('12373909-64c1-4352-8fc0-2b0c9b548dd7', '66ec504e-5d15-4b8b-84d9-2002ca114d0d', '2026-08-12 03:08:04.143', '2026-08-12 03:08:04.143', 55.250000000000000000000000000000);


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.products (id, title, description, stock, price, image, "createdAt", "updatedAt", "isDeleted", "categoryId", status) VALUES ('d46cf478-ba92-4bf7-8b90-7c62a6961b1e', 'Hydrating Hyaluronic Acid Serum', 'Deeply moisturizing facial serum with 2% pure hyaluronic acid for plump and glowing skin.', 50, 18.500000000000000000000000000000, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be', '2026-08-11 10:57:29.923', '2026-08-11 10:57:29.923', false, '4f4f989c-3f5b-4e1f-89ca-9b97e3b1a4a5', 'ACTIVE');
INSERT INTO public.products (id, title, description, stock, price, image, "createdAt", "updatedAt", "isDeleted", "categoryId", status) VALUES ('cfebb4a9-448d-49b0-9d99-2f8b92b0063a', 'Gentle Foaming Face Wash', 'Daily cleanser infused with green tea and aloe vera to remove impurities without drying skin.', 85, 12.990000000000000000000000000000, 'https://images.unsplash.com/photo-1556228720-195a672e8a03', '2026-08-11 10:58:21.829', '2026-08-11 10:58:21.829', false, '4f4f989c-3f5b-4e1f-89ca-9b97e3b1a4a5', 'ACTIVE');
INSERT INTO public.products (id, title, description, stock, price, image, "createdAt", "updatedAt", "isDeleted", "categoryId", status) VALUES ('7c9da3b6-4d28-4746-8e85-1b2ecec5e259', 'Sunscreen SPF 50+ PA++++', 'Lightweight non-greasy broad spectrum sunscreen with zero white cast.', 120, 15.750000000000000000000000000000, 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908', '2026-08-11 10:59:22.323', '2026-08-11 10:59:22.323', false, '4f4f989c-3f5b-4e1f-89ca-9b97e3b1a4a5', 'ACTIVE');
INSERT INTO public.products (id, title, description, stock, price, image, "createdAt", "updatedAt", "isDeleted", "categoryId", status) VALUES ('b85ab038-cfb0-41fd-b0fe-5066f4effd8e', 'Smart Fitness Tracker Watch', '1.4-inch AMOLED display smartwatch with heart rate monitor, SpO2 tracking, and 14-day battery life.', 65, 35.500000000000000000000000000000, 'https://i.ibb.co.com/v4LkGGRB/pratik-prasad-FPEBZJLD8-Rs-unsplash.jpg', '2026-08-11 12:00:34.837', '2026-08-11 12:00:34.837', false, '8b1e9a06-edb1-4a6c-bba6-697edc9c1669', 'ACTIVE');
INSERT INTO public.products (id, title, description, stock, price, image, "createdAt", "updatedAt", "isDeleted", "categoryId", status) VALUES ('31a0c3d0-e656-4861-b1ee-3d6f11d71e64', 'Wireless Active Noise-Canceling Earbuds', 'True wireless earbuds with touch controls, IPX5 water resistance, and 24-hour playback with charging case.', 40, 49.990000000000000000000000000000, 'https://i.ibb.co.com/nq8dVypB/yasin-hasan-h50cv-QCj-M-unsplash.jpg', '2026-08-11 12:02:21.436', '2026-08-11 12:02:21.436', false, '8b1e9a06-edb1-4a6c-bba6-697edc9c1669', 'ACTIVE');
INSERT INTO public.products (id, title, description, stock, price, image, "createdAt", "updatedAt", "isDeleted", "categoryId", status) VALUES ('cc0d6657-685d-437d-86b3-ae2e2ec8e6a9', 'Fast Charging 20000mAh Power Bank', 'High-capacity portable charger featuring 22.5W dual USB and Type-C Fast Power Delivery ports.', 100, 28.000000000000000000000000000000, 'https://i.ibb.co.com/G4tBYfHN/gomi-CY4m-Vp-Rv-Pxc-unsplash.jpg', '2026-08-11 12:03:51.377', '2026-08-11 12:03:51.377', false, '8b1e9a06-edb1-4a6c-bba6-697edc9c1669', 'ACTIVE');
INSERT INTO public.products (id, title, description, stock, price, image, "createdAt", "updatedAt", "isDeleted", "categoryId", status) VALUES ('b521687c-4625-4fbc-b233-21fc072e29f7', 'RGB Ergonomic Gaming Mouse', 'Ultra-lightweight wired gaming mouse with 12800 DPI sensor, 7 programmable buttons, and RGB lighting.', 25, 22.990000000000000000000000000000, 'https://i.ibb.co.com/kVJmpzmh/supratik-deshmukh-Soh2aeq-ILLU-unsplash.jpg', '2026-08-11 12:06:05.238', '2026-08-11 12:06:05.238', false, '8b1e9a06-edb1-4a6c-bba6-697edc9c1669', 'ACTIVE');
INSERT INTO public.products (id, title, description, stock, price, image, "createdAt", "updatedAt", "isDeleted", "categoryId", status) VALUES ('d89ad7ab-ce9f-477c-9397-031994ee299f', 'Organic Extra Virgin Olive Oil 500ml', 'Cold-pressed premium extra virgin olive oil, perfect for salad dressings and light cooking.', 60, 14.500000000000000000000000000000, 'https://i.ibb.co.com/5XVdtsTd/ahmet-koc-XLoi-OEx-W18-E-unsplash.jpg', '2026-08-11 12:09:26.085', '2026-08-11 12:09:26.085', false, 'ab4fb3c0-4245-4cc7-bc4e-f8ea019f2a05', 'ACTIVE');
INSERT INTO public.products (id, title, description, stock, price, image, "createdAt", "updatedAt", "isDeleted", "categoryId", status) VALUES ('df199b54-4d0a-41fb-9971-6a3d57d0d8b0', 'Premium Whole Roasted Almonds 250g', 'Crunchy and nutrient-rich whole almonds packed with healthy fats, fiber, and protein.', 90, 8.990000000000000000000000000000, 'https://i.ibb.co.com/kvs3Lt2/mockupo-8-Lv-Xm-MZu-AU0-unsplash.jpg', '2026-08-11 12:10:46.841', '2026-08-11 12:10:46.841', false, 'ab4fb3c0-4245-4cc7-bc4e-f8ea019f2a05', 'ACTIVE');
INSERT INTO public.products (id, title, description, stock, price, image, "createdAt", "updatedAt", "isDeleted", "categoryId", status) VALUES ('56a8ace1-e856-47f9-8b94-63b1adacba8c', 'Organic Green Tea Bags (50 Count)', 'Rich in antioxidants, handpicked green tea leaves for a refreshing and detoxifying brew.', 110, 6.500000000000000000000000000000, 'https://i.ibb.co.com/pvcSG3np/mika-baumeister-YY-w-Veisi-R8-unsplash.jpg', '2026-08-11 12:17:20.772', '2026-08-11 12:17:20.772', false, 'ab4fb3c0-4245-4cc7-bc4e-f8ea019f2a05', 'ACTIVE');
INSERT INTO public.products (id, title, description, stock, price, image, "createdAt", "updatedAt", "isDeleted", "categoryId", status) VALUES ('86891cf7-9510-409a-8c7c-0c0a406c5c12', 'Aroma Essential Oil Diffuser 300ml', 'Ultrasonic cool mist humidifier with 7 color LED lights and auto shut-off function.', 40, 25.990000000000000000000000000000, 'https://i.ibb.co.com/0R7W57VR/istockphoto-947175182-612x612.webp', '2026-08-11 12:20:41.488', '2026-08-11 12:20:41.488', false, 'd17bb2a9-5929-4bc5-9ee6-e266dcfe3015', 'ACTIVE');
INSERT INTO public.products (id, title, description, stock, price, image, "createdAt", "updatedAt", "isDeleted", "categoryId", status) VALUES ('e6623c0f-3082-4657-b1f4-9c40a7eacc73', 'Non-Stick Ceramic Frying Pan Set', 'Durable aluminum cookware with heat-resistant handle and toxin-free ceramic coating.', 30, 38.500000000000000000000000000000, 'https://i.ibb.co.com/qLcjJx3h/alexander-sergienko-n36-Kf-Lq3-X1-I-unsplash.jpg', '2026-08-11 12:22:21.03', '2026-08-11 12:22:21.03', false, 'd17bb2a9-5929-4bc5-9ee6-e266dcfe3015', 'ACTIVE');
INSERT INTO public.products (id, title, description, stock, price, image, "createdAt", "updatedAt", "isDeleted", "categoryId", status) VALUES ('9e31c575-0b15-4d7d-8f88-63bfbfda2c1a', 'Minimalist Ceramic Coffee Mug', 'Handcrafted matte finish ceramic mug, 350ml capacity, microwave and dishwasher safe.', 75, 9.990000000000000000000000000000, 'https://i.ibb.co.com/0jkHmZzf/john-vid-p-DTEZJqy-Hf8-unsplash.jpg', '2026-08-11 12:23:48.396', '2026-08-11 12:23:48.396', false, 'd17bb2a9-5929-4bc5-9ee6-e266dcfe3015', 'ACTIVE');
INSERT INTO public.products (id, title, description, stock, price, image, "createdAt", "updatedAt", "isDeleted", "categoryId", status) VALUES ('dad186c8-f3de-4213-8f20-92910d02c432', 'Adjustable LED Desk Lamp', 'Eye-caring touch control table lamp with 3 color modes and USB charging port.', 50, 21.000000000000000000000000000000, 'https://i.ibb.co.com/5x9cLJGL/premium-photo-1681470951009-8642b690258b.avif', '2026-08-11 12:25:47.216', '2026-08-11 12:25:47.216', false, 'd17bb2a9-5929-4bc5-9ee6-e266dcfe3015', 'ACTIVE');
INSERT INTO public.products (id, title, description, stock, price, image, "createdAt", "updatedAt", "isDeleted", "categoryId", status) VALUES ('b66bd9d3-2081-4107-a62b-e2790ca448a0', 'Stainless Steel Water Bottle', 'Double-wall vacuum insulated water bottle that keeps drinks cold for up to 24 hours.', 100, 29.990000000000000000000000000000, 'https://rokbucket.rokomari.io/ProductNew20190903/260X372/Single_Layer_WB_2142_SS_Non_Thermal_Wate-Proclean-4eebc-420512.png', '2026-08-11 08:51:51.502', '2026-08-12 03:35:04.12', false, 'd17bb2a9-5929-4bc5-9ee6-e266dcfe3015', 'ACTIVE');
INSERT INTO public.products (id, title, description, stock, price, image, "createdAt", "updatedAt", "isDeleted", "categoryId", status) VALUES ('48cec226-fe6a-45e2-a855-376d025aa14f', 'Nourishing Argan Hair Oil', '100% organic cold-pressed argan oil to restore shine, repair split ends, and tame frizz.', 28, 22.000000000000000000000000000000, 'https://images.unsplash.com/photo-1608248597260-8480373e1644', '2026-08-11 10:58:55.858', '2026-08-12 03:08:04.092', false, '4f4f989c-3f5b-4e1f-89ca-9b97e3b1a4a5', 'ACTIVE');
INSERT INTO public.products (id, title, description, stock, price, image, "createdAt", "updatedAt", "isDeleted", "categoryId", status) VALUES ('57f2e7ab-9c4b-4958-a3e5-24a20619c29c', 'Pure Raw Honey 500g', '100% natural and unfiltered wildflower honey sourced directly from local bee farms.', 44, 11.250000000000000000000000000000, 'https://i.ibb.co.com/mC1MKh8H/tommy-diner-my-TXBE-u-SDY-unsplash.jpg', '2026-08-11 12:12:29.121', '2026-08-12 03:08:04.099', false, 'ab4fb3c0-4245-4cc7-bc4e-f8ea019f2a05', 'ACTIVE');


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.order_items (id, "productId", quantity, "createdAt", "updatedAt", "orderId", price) VALUES ('5a0fb1c2-d015-4128-a9f1-e4963797d278', '48cec226-fe6a-45e2-a855-376d025aa14f', 2, '2026-08-12 03:08:04.143', '2026-08-12 03:08:04.143', '12373909-64c1-4352-8fc0-2b0c9b548dd7', 22.000000000000000000000000000000);
INSERT INTO public.order_items (id, "productId", quantity, "createdAt", "updatedAt", "orderId", price) VALUES ('9492eb1b-e91e-4bee-b6c9-5ba88842d18b', '57f2e7ab-9c4b-4958-a3e5-24a20619c29c', 1, '2026-08-12 03:08:04.143', '2026-08-12 03:08:04.143', '12373909-64c1-4352-8fc0-2b0c9b548dd7', 11.250000000000000000000000000000);


--
-- PostgreSQL database dump complete
--

\unrestrict QfuCifudbg86e0gKSIeUGL9wc1GrkW8NXkZ7dLmHZQKabm20kPJHZPZKSvDVs1q

