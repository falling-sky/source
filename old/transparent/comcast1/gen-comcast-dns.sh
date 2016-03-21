#! /bin/sh

../../../extras/generate-dns-examples-for-falling-sky \
 -4 "69.252.208.167" \
 -6 "2001:558:fe23:2:69:252:208:167" \
 --domain "test-ipv6-newcastle.comcast.net" \
 --hostmaster domregtech.comcastonline.com

../../../extras/generate-dns-examples-for-falling-sky \
 -4 "69.252.76.68" \
 -6 "2001:558:fe23:2:69:252:208:167" \
 --domain "test-ipv6-cmc.comcast.net" \
 --hostmaster domregtech.comcastonline.com
