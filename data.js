// Dữ liệu câu hỏi trích từ đề cương ôn tập Sinh học A1 (ĐH Cần Thơ)
// a = chỉ số đáp án đúng (0=A, 1=B, 2=C, 3=D), exp = Giải thích chi tiết tại sao đúng / sai
window.QUIZ_DATA = [
 {
  "id": "c1",
  "title": "Đại cương về tế bào & Đại phân tử",
  "short": "Tế bào",
  "questions": [
   {
    "n": 1,
    "q": "Theo Thuyết tế bào, nhận định nào sau đây là ĐÚNG?",
    "o": [
     "Tất cả các tế bào đều có màng nhân bao bọc vật chất di truyền.",
     "Tế bào là đơn vị cấu trúc và chức năng của sinh vật, mọi tế bào đều được sinh ra từ tế bào có trước.",
     "Mọi tế bào đều có khả năng quang hợp và tự dưỡng.",
     "Virut là dạng sống đơn bào nhỏ nhất."
    ],
    "a": 1,
    "exp": "Theo Thuyết tế bào (Schleiden, Schwann và Virchow): Tế bào là đơn vị tổ chức và chức năng cơ bản của mọi sinh vật sống, và mọi tế bào mới đều được sinh ra từ các tế bào có trước. (A sai vì sơ hạch không có màng nhân; C sai vì chỉ tế bào tự dưỡng mới quang hợp; D sai vì virut là dạng chưa có cấu tạo tế bào)."
   },
   {
    "n": 2,
    "q": "Yếu tố quan trọng nhất giới hạn kích thước tối đa của một tế bào là:",
    "o": [
     "Chiều dài của chuỗi ADN trong nhân.",
     "Tỉ lệ giữa diện tích bề mặt và thể tích tế bào (S/V).",
     "Số lượng ribosome có trong bào tương.",
     "Độ dày của lớp màng sinh chất."
    ],
    "a": 1,
    "exp": "Tỉ lệ diện tích bề mặt trên thể tích (S/V) là giới hạn quan trọng nhất. Khi tế bào tăng kích thước, thể tích V tăng nhanh gấp bội so với diện tích bề mặt S (theo bậc 3 so với bậc 2), khiến tốc độ khuếch tán dưỡng chất và đào thải qua màng không đáp ứng kịp nhu cầu tế bào chất."
   },
   {
    "n": 3,
    "q": "Thành phần nào sau đây có mặt ở tất cả các loại tế bào (sơ hạch lẫn chân hạch)?",
    "o": [
     "Màng nguyên sinh, dịch bào (bào tương), nhiễm sắc thể, ribosome.",
     "Màng nhân, màng nguyên sinh, ti thể, ribosome.",
     "Vách tế bào, màng nguyên sinh, vùng nhân, trung thể.",
     "Dịch bào, màng nhân, vi ống, vi sợi."
    ],
    "a": 0,
    "exp": "Màng sinh chất, tế bào chất (bào tương), vật chất di truyền (ADN/nhiễm sắc thể) và ribosome là 4 thành phần thiết yếu có mặt ở MỌI tế bào (cả sơ hạch và chân hạch). (B, D sai vì tế bào sơ hạch không có màng nhân hay ti thể; C sai vì tế bào động vật không có vách tế bào)."
   },
   {
    "n": 4,
    "q": "Vật chất di truyền của tế bào sơ hạch (Prokaryote) có đặc điểm:",
    "o": [
     "Chuỗi xoắn kép dạng thẳng, liên kết với protein histone.",
     "Dạng vòng, không liên kết với protein, nằm ở vùng nhân (nucleoid).",
     "Dạng vòng, liên kết chặt chẽ với protein histone và nằm trong màng nhân.",
     "Tập trung thành từng cặp nhiễm sắc thể nằm ở hạch nhân."
    ],
    "a": 1,
    "exp": "Vật chất di truyền của Prokaryote là một phân tử ADN dạng vòng kép, trần (không liên kết với protein histone) và khu trú ở vùng nhân (nucleoid) không có màng bao bọc."
   },
   {
    "n": 5,
    "q": "Cấu trúc giúp vi khuẩn bám dính vào bề mặt hoặc tế bào chủ là:",
    "o": [
     "Chiên mao (Flagella)",
     "Pili",
     "Ribosome",
     "Plasmid"
    ],
    "a": 1,
    "exp": "Pili (lông nhung/sợi bám) là cấu trúc bề mặt giúp vi khuẩn bám chặt vào giá thể hoặc tế bào chủ; ngoài ra pili giới tính (sex pili) còn giúp tiếp hợp truyền plasmid. (Flagella dùng để di chuyển; Plasmid là phân tử ADN phụ ngoài NST)."
   },
   {
    "n": 6,
    "q": "Thành phần cấu trúc nền tảng của màng sinh chất là:",
    "o": [
     "Lớp đơn glycoprotein",
     "Lớp kép phospholipid",
     "Mạng lưới các chuỗi polypeptide",
     "Lớp chuỗi polysaccharide đan kẽ"
    ],
    "a": 1,
    "exp": "Màng sinh chất có cấu trúc cơ bản là lớp kép phospholipid, trong đó các protein khảm vào hoặc bám trên bề mặt tạo nên mô hình thể khảm lỏng."
   },
   {
    "n": 7,
    "q": "Phát biểu nào sau đây đúng về tính chất của phân tử phospholipid màng?",
    "o": [
     "Đầu chứa phosphate ưa nước hướng ra ngoài, đuôi acid béo kị nước hướng vào trong.",
     "Đầu chứa phosphate kị nước hướng ra ngoài, đuôi acid béo ưa nước hướng vào trong.",
     "Cả đầu phosphate và đuôi acid béo đều hoàn toàn ưa nước.",
     "Cả hai đầu đều kị nước và xếp xen kẽ nhau."
    ],
    "a": 0,
    "exp": "Phân tử phospholipid có tính lưỡng cực: đầu chứa nhóm phosphate phân cực ưa nước hướng ra môi trường dịch ngoại bào và nội bào; hai đuôi acid béo không phân cực kị nước quay vào trong đối diện nhau."
   },
   {
    "n": 8,
    "q": "Thành phần nào không thuộc Hệ thống nội màng (Endomembrane system)?",
    "o": [
     "Mạng nội chất và Bộ máy Golgi",
     "Tiêu thể (Lysosome) và Không bào",
     "Màng nhân và Màng tế bào",
     "Ty thể và Lục lạp"
    ],
    "a": 3,
    "exp": "Ty thể và lục lạp KHÔNG thuộc hệ thống nội màng vì chúng có 2 lớp màng riêng biệt, sở hữu hệ gen ADN vòng và ribosome riêng, tổng hợp protein độc lập và tiến hóa theo con đường nội cộng sinh."
   },
   {
    "n": 9,
    "q": "Chức năng chính của Mạng nội chất sần là:",
    "o": [
     "Tổng hợp lipid, chuyển hóa đường và khử độc.",
     "Tổng hợp protein, tạo màng mới và tạo túi chuyên chở.",
     "Dự trữ Ion Ca<sup>2+</sup> cho tế bào cơ.",
     "Tiêu hủy các phân tử peroxide độc hại."
    ],
    "a": 1,
    "exp": "Mạng nội chất sần có các hạt ribosome đính trên bề mặt, chuyên trách tổng hợp các protein tiết, protein gắn màng và đóng gói chúng vào các túi vận chuyển (transport vesicles). (Chức năng chuyển hóa đường, khử độc thuộc về mạng nội chất trơn)."
   },
   {
    "n": 10,
    "q": "Bào quan nào chịu trách nhiệm chính trong việc tổng hợp lipid, chuyển hóa carbohydrate và khử độc thuốc/chất độc?",
    "o": [
     "Mạng nội chất láng",
     "Mạng nội chất sần",
     "Bộ máy Golgi",
     "Peroxisome"
    ],
    "a": 0,
    "exp": "Mạng nội chất láng (Smooth ER) không có ribosome, là trung tâm tổng hợp lipid (phospholipid, steroid), chuyển hóa carbohydrate và chứa các enzyme khử độc thuốc, độc chất (đặc biệt phát triển ở tế bào gan)."
   },
   {
    "n": 11,
    "q": "Mặt tiếp nhận các túi vận chuyển từ mạng nội chất gửi đến bộ máy Golgi được gọi là:",
    "o": [
     "Mặt trans",
     "Mặt cis",
     "Mặt bài tiết",
     "Mặt giải phóng"
    ],
    "a": 1,
    "exp": "Mặt cis của bộ máy Golgi nằm gần mạng nội chất, là mặt tiếp nhận các túi vận chuyển chở protein và lipid gửi đến; mặt trans nằm ở phía đối diện là mặt giải phóng/xuất túi thành phẩm đi đến các bào quan khác hoặc màng tế bào."
   },
   {
    "n": 12,
    "q": "Bào quan Golgi đóng vai trò như trung tâm:",
    "o": [
     "Cung cấp năng lượng ATP cho tế bào.",
     "Thu thập, biến đổi, đóng gói và phân phối các sản phẩm từ tế bào.",
     "Giải mã thông tin di truyền từ mRNA thành protein.",
     "Tổng hợp cellulose cấu tạo nên vách tế bào."
    ],
    "a": 1,
    "exp": "Bộ máy Golgi hoạt động như một bưu điện tế bào: thu nhận, biến đổi hóa học (như glycosyl hóa), phân loại, đóng gói và điều phối các sản phẩm sinh học đến đích."
   },
   {
    "n": 13,
    "q": "Tiêu thể (Lysosome) chứa loại enzyme nào sau đây?",
    "o": [
     "Enzyme oxy hóa acid béo",
     "Enzyme thủy phân (tiêu hóa) các đại phân tử",
     "Enzyme tổng hợp ATP synthase",
     "Enzyme cố định CO<sub>2</sub>"
    ],
    "a": 1,
    "exp": "Tiêu thể (Lysosome) là túi màng chứa các enzyme thủy phân (hydrolase) hoạt động tối ưu ở môi trường acid (pH ~ 5), có chức năng tiêu hóa nội bào các đại phân tử, vi sinh vật và dọn dẹp các bào quan già cỗi (autophagy)."
   },
   {
    "n": 14,
    "q": "Bệnh Tay-Sachs liên quan đến sự thiếu hụt enzyme ở bào quan nào, làm tích tụ lipid trong tế bào thần kinh?",
    "o": [
     "Ty thể",
     "Bộ máy Golgi",
     "Tiêu thể (Lysosome)",
     "Peroxisome"
    ],
    "a": 2,
    "exp": "Bệnh Tay-Sachs là bệnh di truyền do thiếu hụt enzyme thủy phân lipid (Hexosaminidase A) trong lysosome, khiến chất béo ganglioside bị ứ đọng không phân giải được trong tế bào thần kinh não, dẫn đến thoái hóa hệ thần kinh."
   },
   {
    "n": 15,
    "q": "Loại không bào chiếm thể tích lớn ở tế bào thực vật trưởng thành, giúp duy trì sức trương và độ cứng của tế bào là:",
    "o": [
     "Không bào co bóp",
     "Không bào tiêu hóa",
     "Không bào trung tâm",
     "Không bào khí"
    ],
    "a": 2,
    "exp": "Không bào trung tâm ở tế bào thực vật trưởng thành chiếm tới 80 - 90% thể tích tế bào, chứa dịch không bào giúp duy trì áp suất trương nước (turgor pressure), tạo độ cứng cáp cho mô mềm và dự trữ chất hữu cơ, ion khoáng."
   },
   {
    "n": 16,
    "q": "Động vật nguyên sinh sống ở môi trường nước ngọt thường sử dụng cấu trúc nào để đào thải nước thừa ra khỏi tế bào?",
    "o": [
     "Tiêu thể",
     "Không bào co bóp",
     "Peroxisome",
     "Cầu liên bào"
    ],
    "a": 1,
    "exp": "Động vật nguyên sinh nước ngọt (như trùng đế giày, amip) sống trong môi trường nhược trương nên nước liên tục thẩm thấu vào tế bào; chúng dùng không bào co bóp (contractile vacuole) để chủ động gom và bơm nước thừa ra ngoài tránh bị vỡ."
   },
   {
    "n": 17,
    "q": "Bào quan Peroxisome có chức năng quan trọng nào sau đây?",
    "o": [
     "Tổng hợp protein màng.",
     "Thu thập và tiêu hủy các peroxide độc hại (H<sub>2</sub>O<sub>2</sub>) và thủy phân acid béo.",
     "Cố định carbon trong quá trình quang hợp.",
     "Dự trữ Ca<sup>2+</sup>."
    ],
    "a": 1,
    "exp": "Peroxisome chứa các enzyme oxy hóa chuyển hydro từ các chất hữu cơ đến oxy để tạo H2O2, sau đó enzyme catalase phân giải ngay H2O2 thành nước và oxy vô hại; peroxisome cũng tham gia phân giải acid béo chuỗi dài."
   },
   {
    "n": 18,
    "q": "Bệnh loạn dưỡng não chất trắng thượng thận (X-ALD) xảy ra do Peroxisome bị bất thường trong quá trình:",
    "o": [
     "Phân giải glucose",
     "Oxy hóa acid béo chuỗi rất dài (VLCFAs)",
     "Tổng hợp chất béo trung tính",
     "Thủy phân protein"
    ],
    "a": 1,
    "exp": "Bệnh loạn dưỡng não chất trắng thượng thận (X-ALD) là bệnh rối loạn di truyền liên kết NST X do bất thường peroxisome không thể oxy hóa acid béo chuỗi rất dài (VLCFAs), làm chúng tích tụ phá hủy bao myelin quanh sợi thần kinh."
   },
   {
    "n": 19,
    "q": "Ở hạt thực vật đang nảy mầm, bào quan Glyoxisome thực hiện chức năng:",
    "o": [
     "Chuyển hóa acid béo dự trữ thành đường glucose cung cấp cho phôi.",
     "Tiêu hủy các độc tố sinh ra trong hạt.",
     "Bẫy năng lượng ánh sáng mặt trời.",
     "Tổng hợp amino acid."
    ],
    "a": 0,
    "exp": "Glyoxisome là loại peroxisome chuyên biệt ở mô dự trữ của hạt thực vật, chứa các enzyme của chu trình glyoxylate giúp biến đổi acid béo dự trữ thành đường glucose để nuôi phôi mầm trước khi cây quang hợp được."
   },
   {
    "n": 20,
    "q": "Điểm chung nổi bật giữa Ty thể và Lục lạp là:",
    "o": [
     "Đều thuộc hệ thống nội màng và có màng đơn.",
     "Được bao bọc bởi 2 lớp màng kép, có ADN dạng vòng riêng và ribosome riêng.",
     "Đều chỉ tìm thấy ở tế bào động vật.",
     "Đều tham gia trực tiếp vào quá trình tổng hợp lipid."
    ],
    "a": 1,
    "exp": "Ty thể và lục lạp đều có màng kép (2 lớp màng phân biệt), chứa ADN dạng vòng trần và ribosome riêng (tương tự vi khuẩn), tự nhân đôi bán độc lập theo thuyết nguồn gốc nội cộng sinh."
   },
   {
    "n": 21,
    "q": "Cấu trúc màng trong gấp nếp của ty thể tạo ra các mào dẹp được gọi là:",
    "o": [
     "Stroma",
     "Granum",
     "Cristae",
     "Thylakoid"
    ],
    "a": 2,
    "exp": "Màng trong của ty thể gấp nếp sâu tạo thành các gờ mào dẹp gọi là Cristae, làm tăng diện tích bề mặt chứa các chuỗi truyền electron hô hấp và enzyme ATP synthase."
   },
   {
    "n": 22,
    "q": "Chất nền lỏng bên trong lục lạp bao quanh các túi thylakoid được gọi là:",
    "o": [
     "Matrix",
     "Stroma",
     "Cristae",
     "Cytosol"
    ],
    "a": 1,
    "exp": "Chất nền dạng lỏng bên trong lục lạp bao bọc xung quanh các túi thylakoid được gọi là Stroma; đây là nơi chứa enzyme Rubisco và diễn ra pha tối (chu trình Calvin)."
   },
   {
    "n": 23,
    "q": "Cấu trúc xếp chồng gồm nhiều túi dẹp Thylakoid trong lục lạp được gọi là:",
    "o": [
     "Granum",
     "Centrosome",
     "Cristae",
     "Basal body"
    ],
    "a": 0,
    "exp": "Các túi dẹp thylakoid xếp chồng lên nhau thành từng cấu trúc hình trụ được gọi là Granum (số nhiều là Grana)."
   },
   {
    "n": 24,
    "q": "Bào quan Ribosome được cấu tạo từ hai thành phần chính là:",
    "o": [
     "ADN và Protein",
     "rRNA và Protein",
     "mRNA và Lipid",
     "tRNA và Carbohydrate"
    ],
    "a": 1,
    "exp": "Ribosome không có màng bao bọc, được cấu tạo từ ARN ribosome (rRNA) và các phân tử protein, gồm hai tiểu phần lớn và nhỏ kết hợp lại khi dịch mã."
   },
   {
    "n": 25,
    "q": "Khung xương tế bào (Cytoskeleton) được cấu tạo từ 3 loại sợi chính gồm:",
    "o": [
     "Sợi collagen, sợi nhung mao và sợi elastin.",
     "Vi ống, vi sợi và sợi trung gian.",
     "Vi ống, sợi pectin và vi sợi cellulose.",
     "Sợi myosin, sợi keratin và sợi chitin."
    ],
    "a": 1,
    "exp": "Khung xương tế bào (Cytoskeleton) ở tế bào nhân thực gồm 3 loại sợi: Vi ống (Microtubules, đường kính ~25nm), Vi sợi (Microfilaments/sợi actin, ~7nm) và Sợi trung gian (Intermediate filaments, ~8-12nm)."
   },
   {
    "n": 26,
    "q": "Đơn vị cấu tạo nên các vi ống (Microtubules) là protein:",
    "o": [
     "Actin",
     "Tubulin",
     "Keratin",
     "Myosin"
    ],
    "a": 1,
    "exp": "Vi ống (Microtubules) được cấu tạo từ các nhị phân protein Tubulin (gồm alpha-tubulin và beta-tubulin), tạo nên cấu trúc ống rỗng hình trụ."
   },
   {
    "n": 27,
    "q": "Loại sợi nào của khung xương tế bào có độ bền vững cao nhất, giúp cố định vị trí các bào quan như nhân?",
    "o": [
     "Vi ống",
     "Vi sợi (sợi actin)",
     "Sợi trung gian",
     "Sợi myosin"
    ],
    "a": 2,
    "exp": "Sợi trung gian (như Keratin) có cấu trúc dạng dây cáp bện bền vững nhất, chịu lực căng cơ học cao và giữ vai trò cố định vị trí của nhân cùng các bào quan khác trong tế bào."
   },
   {
    "n": 28,
    "q": "Thành phần khung xương tế bào tham gia vào sự vận động co cơ cùng với Myosin là:",
    "o": [
     "Vi sợi (Actin)",
     "Vi ống (Tubulin)",
     "Sợi trung gian (Keratin)",
     "Collagen"
    ],
    "a": 0,
    "exp": "Vi sợi được cấu tạo từ các chuỗi protein Actin; sự tương tác trượt giữa sợi actin và protein vận động Myosin là cơ chế nền tảng cho sự co cơ và chuyển động amip của tế bào."
   },
   {
    "n": 29,
    "q": "Ở tế bào động vật, trung thể (Centrosome) chứa một cặp trung tử. Mỗi trung tử gồm:",
    "o": [
     "9 nhóm, mỗi nhóm có 2 vi ống xếp xung quanh 1 vi ống trung tâm.",
     "9 nhóm, mỗi nhóm có 3 vi ống xếp thành vòng.",
     "12 vi sợi xếp song song.",
     "9 nhóm vi sợi đan xen sợi trung gian."
    ],
    "a": 1,
    "exp": "Mỗi trung tử (centriole) gồm 9 nhóm vi ống, mỗi nhóm có 3 vi ống xếp thành một vòng hình trụ (cấu trúc 9 nhóm ba, tức 9+0)."
   },
   {
    "n": 30,
    "q": "Cấu trúc thể gốc (Basal body) ở chân tiêm mao và chiên mao có kiểu sắp xếp vi ống là:",
    "o": [
     "Cấu trúc 9+2",
     "Cấu trúc 9+0 (9 nhóm ba)",
     "Cấu trúc 9+3",
     "Cấu trúc 10+1"
    ],
    "a": 1,
    "exp": "Thể gốc (Basal body) ở gốc lông và roi có cấu trúc tương tự trung tử, sắp xếp theo kiểu 9 nhóm ba vi ống không có vi ống ở tâm (công thức 9+0)."
   },
   {
    "n": 31,
    "q": "Loại protein cơ học vận động liên kết các cặp vi ống ở tiêm mao/chiên mao giúp chúng uốn cong là:",
    "o": [
     "Dynein",
     "Keratin",
     "Fibronectin",
     "Integrin"
    ],
    "a": 0,
    "exp": "Dynein là protein vận động gắn giữa các cặp vi ống ở lông và roi; khi dynein dùng ATP để bước di chuyển, lực trượt bị cản lại chuyển thành chuyển động uốn cong của lông/roi."
   },
   {
    "n": 32,
    "q": "Thành phần hóa học chính cấu tạo nên vách tế bào ở thực vật là:",
    "o": [
     "Peptidoglycan",
     "Chitin",
     "Cellulose",
     "Pseudopeptidoglycan"
    ],
    "a": 2,
    "exp": "Thành phần cấu trúc chính của vách tế bào thực vật là Cellulose - một polysaccharide mạch thẳng gồm các gốc beta-glucose liên kết bằng liên kết beta-1,4-glycosidic tạo thành các bó vi sợi chịu lực bền chắc."
   },
   {
    "n": 33,
    "q": "Lớp chung (phiến giữa) nằm giữa vách sơ cấp của hai tế bào thực vật kế cận nhau chứa nhiều:",
    "o": [
     "Suberin",
     "Pectin",
     "Lignin",
     "Cutin"
    ],
    "a": 1,
    "exp": "Phiến giữa (lớp chung) nằm giữa vách sơ cấp của hai tế bào thực vật kề nhau chứa nhiều Pectin - chất keo dính polysaccharide giúp gắn kết chặt các tế bào với nhau."
   },
   {
    "n": 34,
    "q": "Cấu trúc xuyên qua vách tế bào thực vật giúp thông thương tế bào chất giữa các tế bào kề nhau là:",
    "o": [
     "Tiêu thể",
     "Cầu liên bào (Plasmodesmata)",
     "Khớp nối chặt (Tight junction)",
     "Thể liên kết (Desmosome)"
    ],
    "a": 1,
    "exp": "Cầu liên bào (Plasmodesmata) là các kênh xuyên thủng qua vách tế bào thực vật, nối liền màng sinh chất và tế bào chất của các tế bào cạnh nhau, cho phép nước và phân tử nhỏ lưu thông trực tiếp."
   },
   {
    "n": 35,
    "q": "Chất ngoại bào (ECM) ở tế bào động vật liên kết với màng tế bào thông qua protein thụ thể màng nào?",
    "o": [
     "Collagen",
     "Fibronectin",
     "Integrins",
     "Proteoglycan"
    ],
    "a": 2,
    "exp": "Integrins là các protein thụ thể xuyên màng ở tế bào động vật; đầu ngoài của chúng liên kết với fibronectin thuộc chất ngoại bào (ECM), đầu trong gắn kết với khung xương vi sợi actin qua protein tiếp hợp."
   },
   {
    "n": 36,
    "q": "Công thức tổng quát của Carbohydrate là:",
    "o": [
     "(CH<sub>2</sub>O)<sub>n</sub>",
     "C<sub>n</sub>(H<sub>2</sub>O)<sub>2n</sub>",
     "CHO<sub>2</sub>",
     "C<sub>n</sub>H<sub>2n</sub>O<sub>2n</sub>"
    ],
    "a": 0,
    "exp": "Carbohydrate có công thức thực nghiệm tổng quát là (CH2O)n hoặc Cn(H2O)n (trong đó n >= 3), nghĩa là tỷ lệ H:O thường xấp xỉ 2:1 giống như nước."
   },
   {
    "n": 37,
    "q": "Đường đơn (Monosaccharide) phổ biến nhất đóng vai trò cung cấp năng lượng chính cho tế bào là:",
    "o": [
     "Ribose",
     "Glucose",
     "Fructose",
     "Galactose"
    ],
    "a": 1,
    "exp": "Glucose (C6H12O6) là monosaccharide phổ biến và quan trọng nhất, là sản phẩm trực tiếp của quang hợp và là nguyên liệu phân giải hàng đầu để cung cấp năng lượng ATP cho tế bào."
   },
   {
    "n": 38,
    "q": "Phân tử Sucrose (đường kính/đường mía) là một Disaccharide được cấu tạo từ:",
    "o": [
     "Glucose + Glucose",
     "Glucose + Fructose",
     "Glucose + Galactose",
     "Fructose + Galactose"
    ],
    "a": 1,
    "exp": "Sucrose (đường mía) là đường đôi disaccharide hình thành từ 1 phân tử alpha-glucose liên kết với 1 phân tử beta-fructose qua liên kết alpha-1,2-glycosidic."
   },
   {
    "n": 39,
    "q": "Liên kết hóa học hình thành giữa hai đơn phân đường đơn để tạo thành đường đôi/đường đa là:",
    "o": [
     "Liên kết Peptide",
     "Liên kết Phosphodiester",
     "Liên kết Glycosidic",
     "Liên kết Hydrogen"
    ],
    "a": 2,
    "exp": "Liên kết Glycosidic là liên kết cộng hóa trị hình thành giữa hai đơn phân đường monosaccharide thông qua phản ứng ngưng tụ (tách đi một phân tử H2O)."
   },
   {
    "n": 40,
    "q": "Polysaccharide đóng vai trò dự trữ đường chủ yếu ở cơ thể động vật và người là:",
    "o": [
     "Tinh bột (Starch)",
     "Glycogen",
     "Cellulose",
     "Chitin"
    ],
    "a": 1,
    "exp": "Glycogen là polysaccharide phân nhánh cao, đóng vai trò là chất dự trữ carbohydrate chính ở động vật và con người, tập trung nhiều nhất ở gan và tế bào cơ xương."
   },
   {
    "n": 41,
    "q": "Cấu trúc polysaccharide nào cấu tạo nên vỏ ngoài của các loài chân khớp (tôm, cua, nhện) và vách tế bào nấm?",
    "o": [
     "Cellulose",
     "Chitin",
     "Peptidoglycan",
     "Amylopectin"
    ],
    "a": 1,
    "exp": "Chitin là polymer cấu tạo từ các đơn phân N-acetylglucosamine; chitin tạo nên bộ xương ngoài cứng dai của động vật chân khớp và thành tế bào của hầu hết các loài nấm."
   },
   {
    "n": 42,
    "q": "Đặc điểm đặc trưng nhất của tất cả các hợp chất Lipid là:",
    "o": [
     "Đều có cấu tạo từ các đơn phân amino acid.",
     "Đều là các hợp chất kị nước, không hoặc rất ít tan trong nước.",
     "Đều tan tốt trong các dung môi phân cực như nước.",
     "Đều chứa liên kết glycosidic."
    ],
    "a": 1,
    "exp": "Tất cả các loại lipid (chất béo, phospholipid, steroid, sáp) đều có đặc tính chung là kị nước (hydrophobic), không tan hoặc rất ít tan trong nước do chứa phần lớn liên kết C-C và C-H không phân cực."
   },
   {
    "n": 43,
    "q": "Phân tử chất béo trung tính (Triglyceride) được cấu tạo gồm:",
    "o": [
     "1 phân tử Glycerol liên kết với 3 acid béo.",
     "1 phân tử Glycerol liên kết với 2 acid béo và 1 nhóm Phosphate.",
     "1 phân tử Alcohol liên kết với 1 chuỗi Carbohydrate.",
     "4 vòng carbon gắn kết liền nhau."
    ],
    "a": 0,
    "exp": "Một phân tử chất béo trung tính (Triglyceride/Triacylglycerol) được cấu tạo từ 1 phân tử rượu glycerol 3-carbon liên kết ester với 3 chuỗi acid béo."
   },
   {
    "n": 44,
    "q": "Điểm khác biệt giữa chất béo no (bão hòa) và chất béo không no (chưa bão hòa) là:",
    "o": [
     "Chất béo no chứa liên kết đôi C=C trong chuỗi acid béo.",
     "Chất béo không no chứa một hoặc nhiều liên kết đôi C=C làm chuỗi acid béo bị gấp khúc.",
     "Chất béo no thường ở dạng lỏng ở nhiệt độ phòng.",
     "Chất béo không no có nguồn gốc chủ yếu từ mỡ động vật."
    ],
    "a": 1,
    "exp": "Chất béo không no chứa một hoặc nhiều liên kết đôi C=C (thường ở cấu hình cis), tạo nên khúc gấp gập trong chuỗi carbon khiến các phân tử khó xếp khít nhau, do đó có nhiệt độ nóng chảy thấp và ở thể lỏng ở nhiệt độ phòng."
   },
   {
    "n": 45,
    "q": "Cấu trúc một phân tử Phospholipid gồm:",
    "o": [
     "Khung Glycerol + 2 acid béo kị nước + 1 nhóm phosphate ưa nước.",
     "Khung Glycerol + 3 acid béo kị nước.",
     "Vòng Steroid + 1 chuỗi polypeptide.",
     "Khung Glycerol + 1 acid béo + 2 nhóm phosphate."
    ],
    "a": 0,
    "exp": "Phospholipid gồm 1 khung glycerol liên kết với 2 chuỗi acid béo (đuôi kị nước) và 1 nhóm phosphate tích điện âm gắn thêm phân tử phân cực (đầu ưa nước)."
   },
   {
    "n": 46,
    "q": "Steroid là nhóm lipid có cấu tạo đặc trưng gồm:",
    "o": [
     "Chuỗi acid béo dài liên kết với alcohol chuỗi dài.",
     "Cấu trúc khung 4 vòng carbon gắn liền nhau.",
     "Đuôi hydrocarbon ưa nước liên kết với gốc phosphate.",
     "Chuỗi polypeptide cuộn xoắn."
    ],
    "a": 1,
    "exp": "Steroid là nhóm lipid có cấu trúc phân tử đặc trưng gồm khung carbon tạo bởi 4 vòng hợp nhất (3 vòng 6 carbon và 1 vòng 5 carbon) đính thêm các nhóm thế chức năng."
   },
   {
    "n": 47,
    "q": "Chất nào sau đây là một loại Steroid quan trọng tham gia cấu tạo nên màng tế bào động vật và là tiền chất tổng hợp hormone sinh dục?",
    "o": [
     "Cholesterol",
     "Triglyceride",
     "Phosphatidat",
     "Lecithin"
    ],
    "a": 0,
    "exp": "Cholesterol là một steroid thiết yếu: vừa là thành phần cấu trúc điều hòa tính lỏng của màng tế bào động vật, vừa là chất nền tiền thân để tổng hợp các hormone steroid (như estrogen, testosterone) và vitamin D."
   },
   {
    "n": 48,
    "q": "Các amino acid phân biệt với nhau bởi thành phần nào trong cấu trúc tổng quát?",
    "o": [
     "Nhóm Carboxyl (-COOH)",
     "Nhóm Amino (-NH<sub>2</sub>)",
     "Nguyên tử Carbon trung tâm (α-carbon)",
     "Gốc chuỗi bên (R)"
    ],
    "a": 3,
    "exp": "Mỗi amino acid gồm carbon trung tâm gắn với nhóm carboxyl (-COOH), nhóm amino (-NH2), nguyên tử H và một chuỗi bên R; chính nhóm R quyết định tính chất hóa lý đặc thù của từng loại amino acid."
   },
   {
    "n": 49,
    "q": "Các amino acid liên kết với nhau bằng loại liên kết hóa học nào để tạo nên chuỗi polypeptide?",
    "o": [
     "Liên kết Ester",
     "Liên kết Peptide",
     "Liên kết Hydrogen",
     "Liên kết Disulfide"
    ],
    "a": 1,
    "exp": "Liên kết Peptide là liên kết cộng hóa trị (-CO-NH-) hình thành giữa nhóm carboxyl của amino acid này với nhóm amino của amino acid kế tiếp thông qua phản ứng ngưng tụ tách nước."
   },
   {
    "n": 50,
    "q": "Một chuỗi peptide được gọi là một Polypeptide khi phân tử có chứa:",
    "o": [
     "Từ 2 đến 10 amino acid.",
     "Chiều dài lớn hơn 50 amino acid.",
     "Đúng 20 amino acid thiết yếu.",
     "Dưới 30 amino acid"
    ],
    "a": 1,
    "exp": "Theo quy ước hóa sinh, chuỗi gồm từ 2 đến khoảng vài chục amino acid liên kết với nhau gọi là peptide (hoặc oligopeptide); chuỗi dài thường trên 50 amino acid cuộn gấp thành cấu trúc không gian ổn định được gọi là polypeptide hay protein."
   }
  ]
 },
 {
  "id": "c2",
  "title": "Màng tế bào & Vận chuyển qua màng",
  "short": "Màng TB",
  "questions": [
   {
    "n": 1,
    "q": "Màng tế bào đóng vai trò quan trọng trong việc phân chia ranh giới giữa:",
    "o": [
     "Nhân và tế bào chất",
     "Bên trong tế bào với môi trường ngoài",
     "Ti thể và lục lạp",
     "Các bào quan với nhau"
    ],
    "a": 1,
    "exp": "Màng sinh chất (plasma membrane) là ranh giới vật lý linh hoạt ngăn cách môi trường sống bên trong tế bào với môi trường ngoại bào, đồng thời kiểm soát mọi trao đổi chất giữa tế bào với môi trường."
   },
   {
    "n": 2,
    "q": "Màng tế bào có tính chất đặc trưng nào sau đây?",
    "o": [
     "Bán thấm tuyệt đối",
     "Tính thấm chọn lọc (selective permeability)",
     "Không cho bất kỳ chất nào đi qua",
     "Cho tất cả các chất đi qua do tự do"
    ],
    "a": 1,
    "exp": "Tính thấm chọn lọc (selective permeability) là đặc tính sống còn của màng: màng cho phép một số chất đi qua dễ dàng hơn các chất khác (cho khí không cực đi qua, cản trở các ion tích điện và phân tử phân cực lớn)."
   },
   {
    "n": 3,
    "q": "Thành phần hóa học chính cấu tạo nên màng tế bào gồm:",
    "o": [
     "Protein, Acid nucleic và Carbohydrate",
     "Lipid, Protein và Carbohydrate",
     "Lipid, Protein và Vitamin",
     "Phospholipid, Cholesterol và ADN"
    ],
    "a": 1,
    "exp": "Màng sinh chất được cấu tạo từ ba thành phần phân tử chính: Lipid (chủ yếu là phospholipid và cholesterol), Protein (protein xuyên màng và ngoại vi) và Carbohydrate (dưới dạng glycolipid và glycoprotein)."
   },
   {
    "n": 4,
    "q": "Loại lipid phổ biến nhất cấu tạo nên lớp màng kép của tế bào là:",
    "o": [
     "Triglyceride",
     "Steroid",
     "Phospholipid",
     "Glycolipid"
    ],
    "a": 2,
    "exp": "Phospholipid là loại lipid chiếm tỉ lệ dồi dào nhất cấu tạo nên khung nền của tất cả các màng sinh học trong tế bào."
   },
   {
    "n": 5,
    "q": "Đặc điểm cấu tạo của một phân tử phospholipid màng là:",
    "o": [
     "1 đầu ưa nước và 1 đuôi kỵ nước",
     "1 đầu kỵ nước và 1 đuôi ưa nước",
     "2 đầu kỵ nước",
     "2 đầu ưa nước"
    ],
    "a": 0,
    "exp": "Mỗi phân tử phospholipid gồm một đầu phân cực mang nhóm phosphate có tính ưa nước (hydrophilic) và phần đuôi hydrocarbon gồm 2 chuỗi acid béo kị nước (hydrophobic)."
   },
   {
    "n": 6,
    "q": "Trong lớp kép phospholipid, các đuôi kỵ nước có xu hướng:",
    "o": [
     "Quay ra môi trường ngoài tế bào",
     "Quay vào môi trường tế bào chất",
     "Hướng vào nhau ở phần bên trong của màng",
     "Lên kết chặt chẽ với carbohydrate"
    ],
    "a": 2,
    "exp": "Trong môi trường nước nội bào và ngoại bào, các đuôi acid béo kị nước tự động né tránh nước bằng cách quay vào trong đối diện nhau, trong khi các đầu ưa nước quay ra ngoài tiếp xúc với dung dịch."
   },
   {
    "n": 7,
    "q": "Mô hình màng tế bào dạng \"Sandwich\" (lớp kép phospholipid nằm giữa hai lớp protein) được đề xuất bởi:",
    "o": [
     "Singer và Nicolson",
     "Hugh Davson và James Danielli",
     "Robert Hooke",
     "Watson và Crick"
    ],
    "a": 1,
    "exp": "Năm 1935, Hugh Davson và James Danielli đề xuất mô hình màng bánh kẹp (sandwich model), cho rằng lớp kép phospholipid bị kẹp chặt giữa hai lớp protein trải phẳng ở hai mặt ngoài."
   },
   {
    "n": 8,
    "q": "Mô hình cấu trúc màng tế bào được công nhận và áp dụng phổ biến hiện nay là:",
    "o": [
     "Mô hình Sandwich",
     "Mô hình Thể khảm lỏng (Fluid mosaic model)",
     "Mô hình Đơn màng",
     "Mô hình Lớp kép Protein"
    ],
    "a": 1,
    "exp": "Mô hình Thể khảm lỏng (Fluid mosaic model) được công nhận rộng rãi hiện nay: màng là một cấu trúc lỏng linh hoạt gồm lớp kép phospholipid, trong đó các phân tử protein khảm lơ lửng và tự do dịch chuyển bên trong lớp lipid."
   },
   {
    "n": 9,
    "q": "Mô hình Thể khảm lỏng do ai đề xuất và vào năm nào?",
    "o": [
     "Davson & Danielli (1935)",
     "Singer & Nicolson (1972)",
     "Watson & Crick (1953)",
     "Schleiden & Schwann (1839)"
    ],
    "a": 1,
    "exp": "Mô hình Thể khảm lỏng do S.J. Singer và G.L. Nicolson công bố chính thức vào năm 1972 trên tạp chí Science."
   },
   {
    "n": 10,
    "q": "Từ \"khảm\" trong mô hình \"Thể khảm lỏng\" dùng để chỉ:",
    "o": [
     "Các phân tử phospholipid sắp xếp phân nhánh",
     "Các phân tử protein phân bố rải rác trong lớp kép phospholipid",
     "Sự phân bố ngẫu nhiên của các phân tử nước",
     "Các chuỗi carbohydrate khảm trên phân tử DNA"
    ],
    "a": 1,
    "exp": "Từ 'khảm' (mosaic) mô tả sự phân bố rải rác của nhiều loại protein chức năng khác nhau khảm chìm sâu hoặc nổi trên bề mặt của biển lớp kép phospholipid mềm dẻo."
   },
   {
    "n": 11,
    "q": "Yếu tố chính quy định tính lỏng (fluidity) của màng tế bào là:",
    "o": [
     "Các phân tử Protein màng",
     "Các phân tử Lipid",
     "Các chuỗi Carbohydrate",
     "Sự có mặt của nước xung quanh màng"
    ],
    "a": 1,
    "exp": "Tính lỏng của màng tế bào chủ yếu do các phân tử lipid (phospholipid và acid béo) quyết định nhờ các tương tác kị nước yếu giữa các đuôi hydrocarbon cho phép chúng chuyển động qua lại linh hoạt."
   },
   {
    "n": 12,
    "q": "Tần suất dịch chuyển qua lại (sang bên) của các phân tử phospholipid trong màng khoảng:",
    "o": [
     "1 lần/tháng",
     "10<sup>3</sup> lần/giây",
     "10<sup>7</sup> lần/giây",
     "10<sup>12</sup> lần/giây"
    ],
    "a": 2,
    "exp": "Chuyển động đổi chỗ sang bên (lateral diffusion) của các phân tử phospholipid diễn ra cực kỳ nhanh chóng và liên tục với tần suất ước tính khoảng 10^7 lần mỗi giây."
   },
   {
    "n": 13,
    "q": "Tần suất chuyển động đảo màng (lên - xuống / flip-flop) của phân tử phospholipid xảy ra khoảng:",
    "o": [
     "10<sup>7</sup> lần/giây",
     "1 lần/ngày",
     "1 lần/tháng",
     "1 lần/năm"
    ],
    "a": 2,
    "exp": "Chuyển động lật ngược (flip-flop / đảo từ lá màng này sang lá màng đối diện) rất hiếm khi xảy ra tự phát (khoảng 1 lần/tháng cho mỗi phân tử) vì đầu ưa nước phân cực rất khó xuyên qua lõi kị nước của màng."
   },
   {
    "n": 14,
    "q": "Yếu tố nào sau đây giúp màng tế bào duy trì tính lỏng ở nhiệt độ thấp?",
    "o": [
     "Tăng hàm lượng acid béo no",
     "Sự có mặt của các acid béo không no (có liên kết đôi)",
     "Tăng lượng protein xuyên màng",
     "Giảm số lượng phospholipid"
    ],
    "a": 1,
    "exp": "Các acid béo không no có liên kết đôi C=C dạng cis tạo các góc gập khúc trong chuỗi hydrocarbon, ngăn cản các phân tử phospholipid đóng gói ép chặt lại với nhau, nhờ đó duy trì tính lỏng cho màng ngay cả khi nhiệt độ hạ thấp."
   },
   {
    "n": 15,
    "q": "Vai trò của Cholesterol đối với tính lỏng của màng tế bào động vật là:",
    "o": [
     "Luôn làm tăng tính lỏng của màng",
     "Luôn làm cứng màng tế bào",
     "Đóng vai trò như một chất đệm nhiệt độ (duy trì độ ổn định tính lỏng)",
     "Không ảnh hưởng đến tính lỏng của màng"
    ],
    "a": 2,
    "exp": "Cholesterol hoạt động như một chất đệm nhiệt độ (temperature buffer): ở nhiệt độ cao, nó cản trở sự chuyển động tự do của phospholipid làm giảm tính lỏng quá mức; ở nhiệt độ thấp, nó ngăn các phân tử ép chặt vào nhau chống đông cứng màng."
   },
   {
    "n": 16,
    "q": "Dựa vào vị trí liên kết với màng, protein màng được chia thành 2 loại chính là:",
    "o": [
     "Protein ưa nước và Protein kỵ nước",
     "Protein xuyên màng (tích hợp) và Protein ngoại vi",
     "Protein cấu trúc và Protein enzyme",
     "Protein vận chuyển và Protein thụ thể"
    ],
    "a": 1,
    "exp": "Dựa vào vị trí và mức độ liên kết với lớp lipid kép, protein màng được chia làm 2 nhóm lớn: Protein xuyên màng (tích hợp - integral proteins) và Protein ngoại vi (peripheral proteins)."
   },
   {
    "n": 17,
    "q": "Khác với protein ngoại vi, protein xuyên màng (integral proteins) có đặc điểm:",
    "o": [
     "Chỉ bám ở mặt ngoài của màng",
     "Chỉ bám ở mặt trong của màng",
     "Đâm xuyên qua lớp lipid kép và có miền kỵ nước nằm trong lòng màng",
     "Dễ dàng bị tách khỏi màng bằng dung dịch muối loãng"
    ],
    "a": 2,
    "exp": "Protein xuyên màng (integral proteins) cắm sâu hoặc đâm xuyên qua toàn bộ bề dày của lớp lipid kép, có miền nằm trong lòng màng chứa các amino acid kị nước dạng xoắn alpha."
   },
   {
    "n": 18,
    "q": "Chức năng nào sau đây không phải là chức năng trực tiếp của protein màng?",
    "o": [
     "Vận chuyển các chất qua màng",
     "Hoạt tính enzyme",
     "Truyền tín hiệu tế bào",
     "Lưu trữ thông tin di truyền"
    ],
    "a": 3,
    "exp": "Lưu trữ và truyền đạt thông tin di truyền là chức năng của acid nucleic (ADN và ARN) trong nhân/tế bào chất, hoàn toàn không phải chức năng trực tiếp của protein màng sinh chất."
   },
   {
    "n": 19,
    "q": "Các chuỗi carbohydrate trên màng tế bào thường liên kết với lipid hoặc protein tạo thành:",
    "o": [
     "Glycolipid và Glycoprotein",
     "Lipoprotein và Phospholipid",
     "Glycogen và Cellulose",
     "Nucleoprotein và Lipoprotein"
    ],
    "a": 0,
    "exp": "Các chuỗi oligosaccharide ngắn trên bề mặt ngoài màng liên kết cộng hóa trị với lipid tạo thành Glycolipid, hoặc liên kết với protein tạo thành Glycoprotein."
   },
   {
    "n": 20,
    "q": "Carbohydrate màng tế bào chủ yếu nằm ở vị trí nào?",
    "o": [
     "Bề mặt hướng vào tế bào chất",
     "Bề mặt ngoài của màng tế bào",
     "Nằm chìm hoàn toàn trong lớp kỵ nước",
     "Phân bố đều ở cả hai mặt màng"
    ],
    "a": 1,
    "exp": "Chuỗi carbohydrate của màng luôn luôn khu trú ở bề mặt hướng ra môi trường ngoại bào, tạo nên lớp áo tế bào glycocalyx."
   },
   {
    "n": 21,
    "q": "Vai trò chính của Carbohydrate màng tế bào là:",
    "o": [
     "Cung cấp năng lượng chính cho tế bào",
     "Nhận biết tế bào (cell-cell recognition)",
     "Tạo kênh cho nước đi qua",
     "Bơm các ion ngược chiều nồng độ"
    ],
    "a": 1,
    "exp": "Carbohydrate màng đóng vai trò là các thẻ nhận diện phân tử (markers) trong quá trình nhận biết tế bào (cell-cell recognition), giúp các tế bào cùng loại nhận ra nhau và hệ miễn dịch phân biệt tế bào bản thân với tế bào lạ."
   },
   {
    "n": 22,
    "q": "Các nhóm máu A, B, AB, O ở người được quy định bởi sự khác biệt của thành phần nào trên màng tế bào hồng cầu?",
    "o": [
     "Các phân tử Phospholipid",
     "Chuỗi Carbohydrate (Glycoprotein/Glycolipid)",
     "Các phân tử Cholesterol",
     "Kênh Protein vận chuyển"
    ],
    "a": 1,
    "exp": "Hệ nhóm máu ABO ở người được quy định bởi sự sai khác cấu trúc của các chuỗi carbohydrate (oligosaccharide) liên kết trên bề mặt màng tế bào hồng cầu."
   },
   {
    "n": 23,
    "q": "Loại protein màng đóng vai trò nối kết các tế bào lại với nhau tạo thành mô được gọi là:",
    "o": [
     "Protein liên kết tế bào (Intercellular joining)",
     "Protein thụ thể",
     "Protein vận chuyển",
     "Thụ thể tyrosine kinase"
    ],
    "a": 0,
    "exp": "Loại protein liên kết tế bào (intercellular joining) giúp kết nối các màng tế bào lân cận qua các mối nối (như mối nối chặt, cầu liên kết, mối nối hở) để tạo thành mô liên kết bền vững."
   },
   {
    "n": 24,
    "q": "Miền protein nằm xuyên qua lớp lipid kép thường có cấu trúc không gian dạng:",
    "o": [
     "Phiến gấp beta (β-sheet)",
     "Xoắn alpha (α-helix) chứa các amino acid kỵ nước",
     "Cấu trúc gấp cuộn ngẫu nhiên",
     "Chuỗi polypeptide thẳng"
    ],
    "a": 1,
    "exp": "Miền protein nằm xuyên qua lõi kị nước của lớp kép phospholipid thường cuộn thành cấu trúc xoắn lò xo alpha (alpha-helix) gồm khoảng 20-25 amino acid có chuỗi bên không phân cực."
   },
   {
    "n": 25,
    "q": "Sự phân bố không đối xứng của các thành phần màng (protein, lipid, carbohydrate) giữa mặt trong và mặt ngoài do cơ quan nào quy định trong quá trình tổng hợp?",
    "o": [
     "Ti thể và Lục lạp",
     "Mạng lưới nội chất (ER) và bộ máy Golgi",
     "Peroxysome và Lysosome",
     "Nhân tế bào"
    ],
    "a": 1,
    "exp": "Sự bất đối xứng của màng (về thành phần lipid, protein và carbohydrate ở hai mặt) được thiết lập ngay từ đầu trong quá trình sinh tổng hợp và hoàn thiện tại Lưới nội chất (ER) và Bộ máy Golgi trước khi túi màng dung hợp với màng sinh chất."
   },
   {
    "n": 26,
    "q": "Protein đóng vai trò là \"Thụ thể\" (Receptor) có chức năng:",
    "o": [
     "Cho các ion đi qua tự do",
     "Tiêu hóa các chất ngoại bào",
     "Gắn kết với chất tín hiệu (ligand) ngoại bào và truyền thông tin vào trong tế bào",
     "Tái tạo phân tử ATP"
    ],
    "a": 2,
    "exp": "Protein thụ thể (Receptor) có vị trí gắn đặc hiệu với phân tử tín hiệu ngoại bào (ligand như hormone), khi gắn kết sẽ làm thay đổi cấu hình thụ thể để truyền tín hiệu vào bên trong tế bào."
   },
   {
    "n": 27,
    "q": "Ma trận ngoại bào (ECM) ở tế bào động vật liên kết với khung xương tế bào thông qua loại protein màng nào?",
    "o": [
     "Integrin",
     "Cadherin",
     "Collagen",
     "Aquaporin"
    ],
    "a": 0,
    "exp": "Integrin là protein xuyên màng liên kết trực tiếp với mạng lưới sợi fibronectin/collagen của chất nền ngoại bào (ECM) ở phía ngoài và neo giữ với vi sợi actin ở phía trong tế bào chất."
   },
   {
    "n": 28,
    "q": "Thành phần nào giúp tế bào nhận biết được các tế bào \"lạ\" (như vi khuẩn hoặc tế bào ghép)?",
    "o": [
     "Cholesterol",
     "Các glycoprotein bề mặt màng",
     "Phospholipids",
     "Bơm Na<sup>+</sup>/K<sup>+</sup>"
    ],
    "a": 1,
    "exp": "Các glycoprotein bề mặt màng tế bào đóng vai trò là kháng nguyên nhận diện; hệ miễn dịch dựa vào các chuỗi glycoprotein này để phân biệt tế bào quen thuộc với tế bào lạ (như vi khuẩn, mô ghép)."
   },
   {
    "n": 29,
    "q": "Protein ngoại vi (peripheral proteins) liên kết với màng thông qua:",
    "o": [
     "Liên kết cộng hóa trị bền vững với đuôi acid béo",
     "Tương tác yếu (liên kết hydro, ion) với protein xuyên màng hoặc đầu ưa nước của lipid",
     "Đâm xuyên qua lớp kép lipid",
     "Liên kết trực tiếp với DNA nhân"
    ],
    "a": 1,
    "exp": "Protein ngoại vi không đâm vào lõi kị nước mà chỉ liên kết lỏng lẻo bằng tương tác yếu (liên kết ion, liên kết hydro) với đầu phân cực của lipid hoặc bề mặt lộ ra của các protein xuyên màng."
   },
   {
    "n": 30,
    "q": "Enzyme màng tế bào thường được sắp xếp như thế nào để thực hiện phản ứng hiệu quả?",
    "o": [
     "Phân bố ngẫu nhiên không quy luật",
     "Sắp xếp theo chuỗi tổ hợp các bước chuyển hóa nối tiếp nhau",
     "Tách rời hoàn toàn khỏi bề mặt màng",
     "Luôn tập trung ở mặt trong tế bào chất"
    ],
    "a": 1,
    "exp": "Các protein enzyme trên màng tế bào thường được sắp xếp thành chuỗi phức hợp cạnh nhau để sản phẩm của phản ứng này lập tức trở thành cơ chất cho phản ứng tiếp theo một cách tuần tự và hiệu quả."
   },
   {
    "n": 31,
    "q": "Phân tử nào sau đây có thể dễ dàng khuếch tán trực tiếp qua lớp kép phospholipid của màng tế bào?",
    "o": [
     "Na<sup>+</sup>, K<sup>+</sup>",
     "Glucose",
     "O<sub>2</sub>, CO<sub>2</sub> (các chất khí nhỏ, không cực)",
     "Các protein kích thước lớn"
    ],
    "a": 2,
    "exp": "Các phân tử không cực, kích thước nhỏ và tan trong lipid như O2, CO2, hydrocarbon dễ dàng hòa tan và khuếch tán trực tiếp qua lớp kép phospholipid mà không cần protein vận chuyển trợ giúp."
   },
   {
    "n": 32,
    "q": "Sự vận chuyển thụ động các chất qua màng tế bào có đặc điểm:",
    "o": [
     "Cần tiêu tốn năng lượng ATP",
     "Vận chuyển ngược chiều gradient nồng độ",
     "Vận chuyển theo chiều gradient nồng độ và không tốn năng lượng",
     "Chỉ diễn ra qua các bóng vận chuyển"
    ],
    "a": 2,
    "exp": "Vận chuyển thụ động (khuếch tán đơn thuần, khuếch tán tăng cường, thẩm thấu) luôn diễn ra theo chiều xuôi gradient nồng độ (từ nơi nồng độ cao đến nơi nồng độ thấp) và hoàn toàn không tiêu tốn năng lượng ATP."
   },
   {
    "n": 33,
    "q": "Sự khuếch tán của phân tử NƯỚC qua màng chọn lọc được gọi là:",
    "o": [
     "Thẩm thấu (Osmosis)",
     "Thẩm phân",
     "Vận chuyển chủ động",
     "Tự do khuếch tán"
    ],
    "a": 0,
    "exp": "Thẩm thấu (Osmosis) là sự khuếch tán chuyên biệt của phân tử NƯỚC qua màng có tính thấm chọn lọc từ vùng có nồng độ chất tan thấp (thế nước cao) sang vùng có nồng độ chất tan cao (thế nước thấp)."
   },
   {
    "n": 34,
    "q": "Loại protein kênh đặc hiệu giúp nước vận chuyển nhanh chóng qua màng tế bào có tên là:",
    "o": [
     "Ion channel",
     "Aquaporin",
     "Carrier protein",
     "Proton pump"
    ],
    "a": 1,
    "exp": "Aquaporin là protein kênh chuyên biệt cho phép hàng tỷ phân tử nước đi qua màng tế bào mỗi giây theo chiều gradient thẩm thấu nhanh hơn nhiều so với khuếch tán đơn thuần."
   },
   {
    "n": 35,
    "q": "Nếu đặt một tế bào hồng cầu vào dung dịch ưu trương (hypertonic), hiện tượng gì sẽ xảy ra?",
    "o": [
     "Tế bào hút nước và bị vỡ (teomy)",
     "Tế bào mất nước và bị co lại",
     "Tế bào giữ nguyên kích thước",
     "Tế bào phân chia nhanh chóng"
    ],
    "a": 1,
    "exp": "Trong dung dịch ưu trương (hypertonic), nồng độ chất tan ngoại bào cao hơn nội bào, nước bên trong tế bào hồng cầu thẩm thấu thoát ra ngoài làm tế bào mất nước và co rúm (teo gai)."
   },
   {
    "n": 36,
    "q": "Hiện tượng co nguyên sinh (plasmolysis) xuất hiện khi đưa tế bào thực vật vào dung dịch:",
    "o": [
     "Nhược trương",
     "Đẳng trương",
     "Ưu trương",
     "Nước cất"
    ],
    "a": 2,
    "exp": "Hiện tượng co nguyên sinh (plasmolysis) xảy ra khi cho tế bào thực vật vào dung dịch ưu trương; nước trong không bào thoát ra ngoài làm khối nguyên sinh chất co lại và tách rời khỏi vách cellulose."
   },
   {
    "n": 37,
    "q": "Sự khuếch tán tăng cường (Facilitated diffusion) khác với khuếch tán đơn thuần ở điểm nào?",
    "o": [
     "Cần sử dụng năng lượng ATP",
     "Vận chuyển ngược chiều gradient nồng độ",
     "Nhờ sự hỗ trợ của các protein màng (kênh hoặc chất mang)",
     "Chỉ xảy ra ở tế bào vi khuẩn"
    ],
    "a": 2,
    "exp": "Khuếch tán tăng cường (facilitated diffusion) là vận chuyển thụ động các chất phân cực/ion xuôi gradient nồng độ với sự trợ giúp của các protein kênh (channel) hoặc protein mang (carrier) trên màng."
   },
   {
    "n": 38,
    "q": "Vận chuyển chủ động (Active transport) là phương thức vận chuyển:",
    "o": [
     "Cùng chiều gradient nồng độ và tốn ATP",
     "Ngược chiều gradient nồng độ và cần tiêu tốn năng lượng (ATP)",
     "Ngược chiều gradient nồng độ nhưng không tốn ATP",
     "Cùng chiều gradient nồng độ và không tốn ATP"
    ],
    "a": 1,
    "exp": "Vận chuyển chủ động (active transport) là quá trình bơm các chất ngược chiều gradient nồng độ (từ nồng độ thấp đến nồng độ cao), đòi hỏi tế bào phải tiêu tốn năng lượng trực tiếp từ thủy phân ATP."
   },
   {
    "n": 39,
    "q": "Bơm Na<sup>+</sup>/K<sup>+</sup> (Na<sup>+</sup>/K<sup>+</sup>-ATPase) trên màng tế bào động vật mỗi chu kỳ hoạt động sẽ:",
    "o": [
     "Bơm 3 Na<sup>+</sup> ra ngoài và 2 K<sup>+</sup> vào trong tế bào",
     "Bơm 2 Na<sup>+</sup> ra ngoài và 3 K<sup>+</sup> vào trong tế bào",
     "Bơm 3 Na<sup>+</sup> vào trong và 2 K<sup>+</sup> ra ngoài tế bào",
     "Bơm 2 Na<sup>+</sup> vào trong và 3 K<sup>+</sup> ra ngoài tế bào"
    ],
    "a": 0,
    "exp": "Bơm Na+/K+-ATPase sử dụng năng lượng thủy phân 1 phân tử ATP để bơm ngược chiều 3 ion Na+ ra ngoài tế bào và 2 ion K+ vào trong tế bào, duy trì điện thế nghỉ cho màng."
   },
   {
    "n": 40,
    "q": "Hoạt động của bơm Na<sup>+</sup>/K<sup>+</sup> thuộc hình thức vận chuyển nào?",
    "o": [
     "Khuếch tán đơn thuần",
     "Khuếch tán tăng cường",
     "Vận chuyển chủ động sơ cấp",
     "Vận chuyển chủ động thứ cấp"
    ],
    "a": 2,
    "exp": "Bơm Na+/K+ sử dụng trực tiếp năng lượng từ sự thủy phân phân tử ATP, do đó thuộc hình thức vận chuyển chủ động sơ cấp (primary active transport)."
   },
   {
    "n": 41,
    "q": "Sự chênh lệch điện thế và nồng độ ion hai bên màng tế bào tạo nên:",
    "o": [
     "Gradient điện hóa (Electrochemical gradient)",
     "Áp suất thẩm thấu đẳng trương",
     "Tính lỏng màng",
     "Lực cản thẩm thấu"
    ],
    "a": 0,
    "exp": "Sự chênh lệch về cả điện thế (điện tích hai bên màng) và nồng độ hóa học của các ion tạo nên Gradient điện hóa (Electrochemical gradient), thúc đẩy các ion khuếch tán qua màng."
   },
   {
    "n": 42,
    "q": "Đồng vận chuyển (Cotransport) là hình thức:",
    "o": [
     "Sự khuếch tán của một chất kéo theo sự vận chuyển chủ động của chất khác",
     "Bơm một ion ra ngoài màng mà không cần năng lượng",
     "Nhập bào kết hợp xuất bào đồng thời",
     "Vận chuyển hai chất cùng chiều mà không cần protein màng"
    ],
    "a": 0,
    "exp": "Đồng vận chuyển (Cotransport) là hình thức vận chuyển chủ động thứ cấp: một protein vận chuyển lợi dụng sự khuếch tán xuôi dốc của một chất (thường là Na+ hoặc H+) để kéo theo một chất khác (như glucose) đi ngược dốc nồng độ."
   },
   {
    "n": 43,
    "q": "Phương thức vận chuyển các đại phân tử (như protein, polysaccharide) từ ngoài vào trong tế bào bằng cách biến dạng màng tế bào gọi là:",
    "o": [
     "Xuất bào (Exocytosis)",
     "Nhập bào (Endocytosis)",
     "Thẩm thấu",
     "Khuếch tán tăng cường"
    ],
    "a": 1,
    "exp": "Nhập bào (Endocytosis) là quá trình tế bào thu nhận các đại phân tử bằng cách lõm màng sinh chất vào trong để bao bọc vật chất rồi tách ra thành túi vận chuyển đi vào tế bào chất."
   },
   {
    "n": 44,
    "q": "Hình thức \"Tế bào uống\" các giọt dịch ngoại bào chứa các chất hòa tan gọi là:",
    "o": [
     "Thực bào (Phagocytosis)",
     "Ẩm bào (Pinocytosis)",
     "Nhập bào qua thụ thể",
     "Xuất bào"
    ],
    "a": 1,
    "exp": "Ẩm bào (Pinocytosis - 'uống tế bào') là hình thức nhập bào không chọn lọc, trong đó màng tế bào lõm vào tạo túi nuốt các giọt dịch ngoại bào chứa các phân tử hòa tan."
   },
   {
    "n": 45,
    "q": "Loại nhập bào có tính chọn lọc cao nhờ sự gắn kết đặc hiệu giữa chất tan và thụ thể bề mặt màng là:",
    "o": [
     "Thực bào",
     "Ẩm bào",
     "Nhập bào thông qua thụ thể (Receptor-mediated endocytosis)",
     "Bơm ion"
    ],
    "a": 2,
    "exp": "Nhập bào qua thụ thể (Receptor-mediated endocytosis) có tính chọn lọc rất cao: tế bào chỉ nhập bào khi các chất tan đặc hiệu (như hạt cholesterol LDL) gắn kết trúng đích vào thụ thể màng tương ứng."
   },
   {
    "n": 46,
    "q": "Tế bào bạch cầu tiêu diệt vi khuẩn xâm nhập bằng phương thức nào sau đây?",
    "o": [
     "Ẩm bào",
     "Thực bào (Phagocytosis)",
     "Xuất bào",
     "Vận chuyển thụ động"
    ],
    "a": 1,
    "exp": "Thực bào (Phagocytosis - 'ăn tế bào') là cơ chế các tế bào thực bào như đại thực bào, bạch cầu trung tính dùng chân giả bao bọc lấy các hạt lớn hoặc vi khuẩn để nuốt vào trong tạo thành không bào tiêu hóa."
   },
   {
    "n": 47,
    "q": "Sự xuất bào (Exocytosis) diễn ra khi:",
    "o": [
     "Màng tế bào lõm vào tạo thành túi vận chuyển",
     "Túi vận chuyển từ bên trong tế bào dung hợp với màng tế bào để giải phóng chất ra ngoài",
     "Tế bào hút nước làm căng màng",
     "Protein kênh mở ra cho chất tan thoát ra"
    ],
    "a": 1,
    "exp": "Xuất bào (Exocytosis) diễn ra khi các túi tiết từ bộ máy Golgi di chuyển đến màng sinh chất, dung hợp màng của túi vào màng tế bào và giải phóng các chất chứa bên trong ra dịch ngoại bào."
   },
   {
    "n": 48,
    "q": "Môi trường có nồng độ chất tan bằng nồng độ chất tan nội bào được gọi là:",
    "o": [
     "Môi trường ưu trương",
     "Môi trường nhược trương",
     "Môi trường đẳng trương (Isotonic)",
     "Môi trường bão hòa"
    ],
    "a": 2,
    "exp": "Môi trường đẳng trương (Isotonic) có nồng độ chất tan ngoại bào cân bằng hoàn toàn với nồng độ chất tan trong tế bào chất, khiến lượng nước vào và ra tế bào ở trạng thái cân bằng động."
   },
   {
    "n": 49,
    "q": "Tế bào thực vật duy trì trạng thái trương nước (trương bão hòa) tối ưu nhất khi sống trong môi trường nào?",
    "o": [
     "Nhược trương",
     "Đẳng trương",
     "Ưu trương",
     "Khô hạn"
    ],
    "a": 0,
    "exp": "Tế bào thực vật có vách tế bào cứng vững chắc; trong môi trường nhược trương (hypotonic), nước thẩm thấu vào làm không bào căng phồng tạo sức trương bão hòa (turgid) lý tưởng giúp nâng đỡ cây đứng thẳng."
   },
   {
    "n": 50,
    "q": "Sự chênh lệch nồng độ của một chất giữa 2 bên màng tế bào tạo nên:",
    "o": [
     "Gradient nồng độ (Concentration gradient)",
     "Gradient điện thế",
     "Áp suất thủy tĩnh",
     "Trạng thái cân bằng động"
    ],
    "a": 0,
    "exp": "Sự chênh lệch về nồng độ của một chất giữa hai vùng không gian (hoặc hai bên màng tế bào) tạo nên Gradient nồng độ (Concentration gradient); các chất có xu hướng tự nhiên khuếch tán xuôi theo gradient này."
   }
  ]
 },
 {
  "id": "c3",
  "title": "Chương 4: Sự quang hợp",
  "short": "Quang hợp",
  "questions": [
   {
    "n": 1,
    "q": "Quang hợp là quá trình biến đổi năng lượng nào thành năng lượng nào?",
    "o": [
     "Hóa năng thành quang năng",
     "Quang năng thành hóa năng",
     "Nhiệt năng thành hóa năng",
     "Cơ năng thành quang năng"
    ],
    "a": 1,
    "exp": "Quang hợp (Photosynthesis) là quá trình tế bào hấp thu quang năng (năng lượng ánh sáng mặt trời) và biến đổi thành hóa năng tích trữ trong các liên kết hóa học của hợp chất hữu cơ (như glucose)."
   },
   {
    "n": 2,
    "q": "Sinh vật nào sau đây là sinh vật quang tự dưỡng?",
    "o": [
     "Con người",
     "Động vật ăn cỏ",
     "Thực vật",
     "Nấm"
    ],
    "a": 2,
    "exp": "Thực vật là sinh vật quang tự dưỡng (photoautotroph): chúng có khả năng tự tổng hợp chất hữu cơ cho cơ thể từ các chất vô cơ đơn giản nhờ sử dụng nguồn năng lượng ánh sáng mặt trời."
   },
   {
    "n": 3,
    "q": "Nguyên liệu đầu vào chính của quá trình quang hợp ở thực vật gồm:",
    "o": [
     "O<sub>2</sub> và H<sub>2</sub>O",
     "CO<sub>2</sub> và H<sub>2</sub>O",
     "C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> và O<sub>2</sub>",
     "CO<sub>2</sub> và O<sub>2</sub>"
    ],
    "a": 1,
    "exp": "Nguyên liệu đầu vào cơ bản của quang hợp gồm có khí Carbon dioxide (CO2 lấy từ khí quyển qua khí khẩu) và Nước (H2O hút từ đất qua rễ lên lá)."
   },
   {
    "n": 4,
    "q": "Sản phẩm tạo thành của quá trình quang hợp gồm:",
    "o": [
     "CO<sub>2</sub> và H<sub>2</sub>O",
     "Glucose và Oxygen",
     "Protein và CO<sub>2</sub>",
     "Lipid và Oxygen"
    ],
    "a": 1,
    "exp": "Sản phẩm cuối cùng của phương trình quang hợp là đường hữu cơ (Glucose - C6H12O6) cung cấp chất dinh dưỡng và khí Dưỡng khí (Oxygen - O2) giải phóng ra môi trường."
   },
   {
    "n": 5,
    "q": "Quang hợp xảy ra ở những nhóm sinh vật nào?",
    "o": [
     "Chỉ xảy ra ở thực vật bậc cao",
     "Thực vật, tảo, một số nguyên sinh vật và một số loài vi khuẩn",
     "Tất cả các loài vi khuẩn và nấm",
     "Động vật đơn bào và thực vật"
    ],
    "a": 1,
    "exp": "Quang hợp không chỉ có ở thực vật bậc cao mà còn diễn ra ở tảo (algae), một số sinh vật nguyên sinh quang hợp và các nhóm vi khuẩn có sắc tố quang hợp (như vi khuẩn lam)."
   },
   {
    "n": 6,
    "q": "Sinh vật nào sau đây là vi khuẩn có khả năng quang hợp?",
    "o": [
     "Vi khuẩn lam",
     "Vi khuẩn E. coli",
     "Trực khuẩn lao",
     "Vi khuẩn cố định đạm"
    ],
    "a": 0,
    "exp": "Vi khuẩn lam (Cyanobacteria) là nhóm vi khuẩn nhân sơ quang tự dưỡng có chứa diệp lục a và phycobilin, có khả năng quang hợp thải oxy tương tự như thực vật."
   },
   {
    "n": 7,
    "q": "Sinh vật nguyên sinh nào sau đây có khả năng quang hợp nhờ chứa lục lạp?",
    "o": [
     "Trùng biến hình",
     "Trùng đế giày",
     "Euglena (Trùng roi)",
     "Amip"
    ],
    "a": 2,
    "exp": "Euglena (Trùng roi xanh) là sinh vật đơn bào thuộc giới Nguyên sinh, trong tế bào chứa nhiều bào quan lục lạp giúp chúng có khả năng quang tự dưỡng khi có ánh sáng mặt trời."
   },
   {
    "n": 8,
    "q": "Quang hợp cung cấp nguồn dinh dưỡng cho:",
    "o": [
     "Chỉ riêng thực vật",
     "Hầu như toàn bộ sinh vật trên Trái Đất",
     "Chỉ các loài động vật ăn thực vật",
     "Các loài vi khuẩn phân hủy"
    ],
    "a": 1,
    "exp": "Quang hợp là mắt xích khởi đầu của mọi chuỗi thức ăn trên Trái Đất: cung cấp trực tiếp hoặc gián tiếp toàn bộ nguồn chất dinh dưỡng và năng lượng cho hầu như toàn bộ sinh quyển."
   },
   {
    "n": 9,
    "q": "Phương trình tổng quát của quang hợp là:",
    "o": [
     "Glucose + Oxygen → Carbon dioxide + Nước",
     "Carbon dioxide + Nước —(ánh sáng)→ Glucose + Oxygen",
     "Carbon dioxide + Oxygen —(ánh sáng)→ Glucose + Nước",
     "Glucose + Carbon dioxide → Nước + Oxygen"
    ],
    "a": 1,
    "exp": "Phương trình tổng quát chuẩn: 6 CO2 + 6 H2O —(ánh sáng, diệp lục)→ C6H12O6 + 6 O2 (Carbon dioxide + Nước tạo thành Glucose + Oxygen)."
   },
   {
    "n": 10,
    "q": "Vai trò quan trọng nhất của quang hợp đối với khí quyển Trái Đất là:",
    "o": [
     "Hấp thụ O<sub>2</sub> và giải phóng CO<sub>2</sub>",
     "Hấp thụ CO<sub>2</sub> và giải phóng O<sub>2</sub>",
     "Làm tăng độ ẩm không khí",
     "Giảm lượng nước trong đất"
    ],
    "a": 1,
    "exp": "Vai trò điều hòa khí quyển hàng đầu của quang hợp là hấp thụ khí nhà kính CO2 và liên tục giải phóng O2 duy trì nồng độ dưỡng khí cần thiết cho hô hấp của sinh vật hiếu khí."
   },
   {
    "n": 11,
    "q": "Cơ quan chính thực hiện chức năng quang hợp ở thực vật là:",
    "o": [
     "Rễ",
     "Thân",
     "Lá",
     "Hoa"
    ],
    "a": 2,
    "exp": "Lá là cơ quan sinh dưỡng chuyên hóa cao độ về mặt hình thái và giải phẫu để tối ưu hóa việc hấp thụ ánh sáng và trao đổi khí CO2 cho quá trình quang hợp ở thực vật."
   },
   {
    "n": 12,
    "q": "Lá thực vật có màu xanh lục chủ yếu là do:",
    "o": [
     "Sự xuất hiện của khí khẩu",
     "Chứa sắc tố diệp lục (chlorophyll) trong lục lạp",
     "Bó mạch lá phản chiếu ánh sáng",
     "Lớp tế bào biểu bì nhuộm màu"
    ],
    "a": 1,
    "exp": "Lá cây có màu xanh lục vì sắc tố diệp lục (chlorophyll) hấp thu mạnh các vùng ánh sáng đỏ và xanh tím của phổ khả kiến, đồng thời phản xạ và truyền qua ánh sáng xanh lục đến mắt người."
   },
   {
    "n": 13,
    "q": "Khí CO<sub>2</sub> đi vào và O<sub>2</sub> đi ra khỏi lá thông qua các cấu trúc hiển vi gọi là:",
    "o": [
     "Thylakoid",
     "Stroma",
     "Khí khẩu (stomata)",
     "Lỗ bó mạch"
    ],
    "a": 2,
    "exp": "Khí CO2 khuếch tán vào lá và O2 cùng hơi nước khuếch tán ra ngoài lá thông qua các lỗ hiển vi ở lớp biểu bì được gọi là Khí khẩu (Stomata / Stoma)."
   },
   {
    "n": 14,
    "q": "Lục lạp được tìm thấy chủ yếu ở loại tế bào nào của lá?",
    "o": [
     "Tế bào biểu bì",
     "Tế bào lục mô (mesophyll)",
     "Tế bào bó mạch",
     "Tế bào lông hút"
    ],
    "a": 1,
    "exp": "Lục lạp tập trung mật độ cao nhất ở các tế bào mô giậu và mô xốp thuộc tầng Lục mô (Mesophyll / thịt lá) nằm giữa hai lớp biểu bì lá."
   },
   {
    "n": 15,
    "q": "Trung bình một tế bào lục mô chứa khoảng bao nhiêu lục lạp?",
    "o": [
     "1 – 10 lục lạp",
     "10 – 20 lục lạp",
     "30 – 40 lục lạp",
     "Trên 100 lục lạp"
    ],
    "a": 2,
    "exp": "Mỗi tế bào mô giậu lục mô thông thường chứa trung bình từ 30 đến 40 bào quan lục lạp để thực hiện phản ứng quang hợp tối đa."
   },
   {
    "n": 16,
    "q": "Diệp lục tố (chlorophyll) phân bố chủ yếu ở vị trí nào trong lục lạp?",
    "o": [
     "Trong chất dịch stroma",
     "Trên màng của các thylakoid",
     "Ở màng ngoài của lục lạp",
     "Ở khoang giữa hai màng"
    ],
    "a": 1,
    "exp": "Diệp lục tố (chlorophyll) cùng các sắc tố phụ carotenoid gắn chặt với các protein màng tạo thành các quang hệ (photosystems) nằm trên Màng Thylakoid."
   },
   {
    "n": 17,
    "q": "Các màng thylakoid xếp chồng lên nhau tạo thành cấu trúc gọi là:",
    "o": [
     "Stroma",
     "Grana (Granum)",
     "Bó mạch",
     "Lục mô"
    ],
    "a": 1,
    "exp": "Các túi dẹp thylakoid xếp chồng ngay ngắn lên nhau thành từng cấu trúc dạng cột tương tự chồng đĩa gọi là Granum (số nhiều là Grana)."
   },
   {
    "n": 18,
    "q": "Chất dịch dạng lỏng nằm bên trong lục lạp bao quanh các thylakoid được gọi là:",
    "o": [
     "Cytosol",
     "Stroma",
     "Matrix",
     "Tiêu thể"
    ],
    "a": 1,
    "exp": "Chất nền dịch lỏng dạng gel nằm bên trong màng kép lục lạp, bao quanh các thylakoid được gọi là Stroma; đây là nơi chứa enzyme Rubisco và các enzyme của chu trình Calvin."
   },
   {
    "n": 19,
    "q": "Cấu trúc nào dưới đây không thuộc về lục lạp?",
    "o": [
     "Màng ngoài và màng trong",
     "Thylakoid và Grana",
     "Chất nền Stroma",
     "Màng thấu quang (Lens membrane)"
    ],
    "a": 3,
    "exp": "Lục lạp chỉ gồm màng ngoài, màng trong, chất nền stroma và màng thylakoid; hoàn toàn không có cấu trúc nào mang tên 'màng thấu quang' (lens membrane)."
   },
   {
    "n": 20,
    "q": "Lớp tế bào nằm giữa hai lớp biểu bì trên và dưới của lá là:",
    "o": [
     "Khí khẩu",
     "Lục mô (mesophyll)",
     "Lớp cutin",
     "Mạch gỗ"
    ],
    "a": 1,
    "exp": "Tầng mô nằm kẹp giữa lớp biểu bì trên và lớp biểu bì dưới của phiến lá được gọi là Lục mô (Mesophyll), bao gồm mô giậu (chứa nhiều lục lạp nhất) và mô khuyết."
   },
   {
    "n": 21,
    "q": "Khí khẩu ở lá huệ gồm các thành phần cơ bản nào?",
    "o": [
     "Tế bào khẩu, tế bào kèm, tiểu khẩu và phòng dưới khẩu",
     "Mạch rây, mạch gỗ và vỏ",
     "Lục mô, thylakoid và stroma",
     "Tế bào hình ống và tế bào hình cầu"
    ],
    "a": 0,
    "exp": "Một phức hợp khí khẩu hoàn chỉnh gồm 2 tế bào khí khẩu (tế bào hình hạt đậu), các tế bào kèm xung quanh, khe lỗ khí (tiểu khẩu) và phòng dưới khẩu chứa không khí."
   },
   {
    "n": 22,
    "q": "Chức năng chính của bó mạch trong lá là gì?",
    "o": [
     "Hấp thụ ánh sáng mặt trời trực tiếp",
     "Vận chuyển nước, khoáng và các chất dinh dưỡng",
     "Thực hiện trao đổi khí CO<sub>2</sub>",
     "Chứa diệp lục tố để quang hợp"
    ],
    "a": 1,
    "exp": "Bó mạch (gân lá) gồm mạch gỗ (xylem) dẫn nước và ion khoáng từ rễ lên cung cấp cho mô lục mô, và mạch rây (phloem) dẫn các sản phẩm đường quang hợp từ lá đến các bộ phận khác của cây."
   },
   {
    "n": 23,
    "q": "Khoang bên trong của một thylakoid được gọi là:",
    "o": [
     "Khoang Stroma",
     "Khoang Thylakoid",
     "Khoang tế bào",
     "Khoang biểu bì"
    ],
    "a": 1,
    "exp": "Không gian bên trong được bao bọc bởi màng thylakoid được gọi là Khoang Thylakoid (Thylakoid space / Thylakoid lumen); đây là nơi tích lũy ion H+ tạo chênh lệch nồng độ proton."
   },
   {
    "n": 24,
    "q": "Sắc tố diệp lục có vai trò gì trong quang hợp?",
    "o": [
     "Cung cấp nước cho lá",
     "Hấp thu năng lượng ánh sáng mặt trời",
     "Đóng mở khí khẩu",
     "Biến đổi O<sub>2</sub> thành CO<sub>2</sub>"
    ],
    "a": 1,
    "exp": "Diệp lục có chức năng thu nhận và hấp thụ các photon ánh sáng mặt trời, kích thích các electron lên mức năng lượng cao để khởi động chuỗi truyền electron quang hợp."
   },
   {
    "n": 25,
    "q": "Cấu trúc lục lạp gồm có mấy lớp màng bao bọc bên ngoài?",
    "o": [
     "1 lớp",
     "2 lớp (màng ngoài và màng trong)",
     "3 lớp",
     "Không có màng"
    ],
    "a": 1,
    "exp": "Lục lạp được bao bọc bên ngoài bởi 2 lớp màng đồng tâm phân biệt: màng ngoài (outer membrane) và màng trong (inner membrane), ngăn cách nhau bởi xoang gian màng."
   },
   {
    "n": 26,
    "q": "Quá trình quang hợp ở thực vật được chia thành mấy pha chính?",
    "o": [
     "1 pha",
     "2 pha (Pha sáng và pha tối/chu trình Calvin)",
     "3 pha",
     "4 pha"
    ],
    "a": 1,
    "exp": "Quang hợp được chia làm 2 giai đoạn kế tiếp nhau: Pha sáng (diễn ra trên màng thylakoid khi có ánh sáng) và Pha tối (chu trình Calvin diễn ra trong stroma)."
   },
   {
    "n": 27,
    "q": "Pha sáng của quá trình quang hợp diễn ra tại vị trí nào trong lục lạp?",
    "o": [
     "Chất nền stroma",
     "Màng thylakoid",
     "Màng ngoài lục lạp",
     "Trong tế bào chất"
    ],
    "a": 1,
    "exp": "Pha sáng diễn ra hoàn toàn trên Màng Thylakoid, nơi tập trung các sắc tố quang hợp, quang hệ I, quang hệ II, chuỗi truyền electron và phức hệ ATP synthase."
   },
   {
    "n": 28,
    "q": "Pha tối (chu trình Calvin) của quang hợp diễn ra tại đâu?",
    "o": [
     "Màng thylakoid",
     "Chất nền stroma",
     "Khí khẩu",
     "Bó mạch"
    ],
    "a": 1,
    "exp": "Pha tối (chu trình Calvin hay chu trình cố định carbon) diễn ra tại Chất nền Stroma của lục lạp, nơi chứa đầy đủ các enzyme hòa tan cần thiết."
   },
   {
    "n": 29,
    "q": "Trong pha sáng, năng lượng ánh sáng được hấp thụ để làm gì?",
    "o": [
     "Tổng hợp trực tiếp Glucose",
     "Cắt phân tử nước (quang phân li nước) và tạo ATP, NADPH",
     "Cố định CO<sub>2</sub>",
     "Khóa khí khẩu lại"
    ],
    "a": 1,
    "exp": "Trong pha sáng, quang năng được diệp lục hấp thu dùng để quang phân ly phân tử nước (tạo electron, proton H+ và giải phóng O2) đồng thời nạp năng lượng tổng hợp nên ATP và chất khử NADPH."
   },
   {
    "n": 30,
    "q": "Oxi (O<sub>2</sub>) được giải phóng trong quang hợp có nguồn gốc từ phân tử nào?",
    "o": [
     "CO<sub>2</sub>",
     "H<sub>2</sub>O",
     "Glucose",
     "ATP"
    ],
    "a": 1,
    "exp": "Khí Oxygen (O2) giải phóng ra trong quang hợp có nguồn gốc từ sự quang phân ly phân tử NƯỚC (H2O: 2 H2O -> 4 H+ + 4 e- + O2), điều này đã được chứng minh bằng đồng vị phóng xạ O-18."
   },
   {
    "n": 31,
    "q": "Sản phẩm của pha sáng được sử dụng làm nguyên liệu cho pha tối là:",
    "o": [
     "CO<sub>2</sub> và H<sub>2</sub>O",
     "ATP và NADPH",
     "Glucose và O<sub>2</sub>",
     "ADP và NADP<sup>+</sup>"
    ],
    "a": 1,
    "exp": "Hai sản phẩm giàu năng lượng được tạo ra từ pha sáng là ATP và NADPH sẽ lập tức được chuyển sang chất nền stroma để làm nguồn năng lượng và lực khử cho pha tối."
   },
   {
    "n": 32,
    "q": "Quá trình cố định CO<sub>2</sub> diễn ra ở pha nào của quang hợp?",
    "o": [
     "Pha sáng",
     "Pha tối (Chu trình Calvin)",
     "Cả hai pha",
     "Pha phân giải"
    ],
    "a": 1,
    "exp": "Quá trình cố định CO2 (gắn CO2 vào hợp chất 5 carbon RuBP nhờ enzyme Rubisco) là phản ứng mở đầu đặc trưng của Pha tối (chu trình Calvin)."
   },
   {
    "n": 33,
    "q": "Chức năng chính của pha tối là:",
    "o": [
     "Giải phóng O<sub>2</sub>",
     "Hấp thụ ánh sáng mặt trời",
     "Sử dụng ATP và NADPH để biến đổi CO<sub>2</sub> thành Carbohydrate (Glucose)",
     "Quang phân li nước"
    ],
    "a": 2,
    "exp": "Pha tối sử dụng năng lượng dự trữ trong ATP và điện tử giàu năng lượng từ NADPH của pha sáng để khử CO2 thành đường 3 carbon G3P, từ đó tổng hợp nên Glucose."
   },
   {
    "n": 34,
    "q": "Yếu tố nào sau đây không bắt buộc phải có trực tiếp cho pha tối diễn ra?",
    "o": [
     "CO<sub>2</sub>",
     "Ánh sáng chiếu trực tiếp",
     "ATP",
     "NADPH"
    ],
    "a": 1,
    "exp": "Pha tối không trực tiếp đòi hỏi ánh sáng chiếu vào (có thể diễn ra trong điều kiện tối ngắn hạn nếu còn đủ ATP và NADPH); tuy nhiên nó cần CO2, ATP và NADPH."
   },
   {
    "n": 35,
    "q": "Chất trực tiếp hấp thụ phôton ánh sáng trong pha sáng là:",
    "o": [
     "Khí CO<sub>2</sub>",
     "Diệp lục tố (chlorophyll)",
     "Enzyme Rubisco",
     "Nước"
    ],
    "a": 1,
    "exp": "Chất trực tiếp hấp thụ năng lượng của các hạt photon ánh sáng mặt trời là phân tử Sắc tố diệp lục (Chlorophyll), đặc biệt là phân tử diệp lục a trung tâm phản ứng."
   },
   {
    "n": 36,
    "q": "Khi khí khẩu đóng lại để hạn chế mất nước, quá trình nào bị ảnh hưởng trực tiếp đầu tiên?",
    "o": [
     "Sự đi vào của CO<sub>2</sub>",
     "Sự hấp thụ ánh sáng",
     "Sự tổng hợp chlorophyll",
     "Sự phân chia tế bào"
    ],
    "a": 0,
    "exp": "Khi cây bị thiếu nước, khí khẩu đóng lại để ngăn thoát hơi nước; việc khí khẩu đóng làm CO2 từ không khí không thể khuếch tán vào lá, khiến nồng độ CO2 nội bào giảm mạnh đầu tiên."
   },
   {
    "n": 37,
    "q": "Trong lục lạp, các hạt Grana được nối với nhau bằng các cấu trúc màng gọi là:",
    "o": [
     "Màng trong",
     "Ống nối thylakoid (Stroma lamellae)",
     "Bó mạch",
     "Lục mô"
    ],
    "a": 1,
    "exp": "Các hạt Grana trong lục lạp được kết nối vật lý với nhau bởi các ống màng thylakoid trải dài gọi là Ống nối thylakoid (Stroma lamellae / màng gian grana)."
   },
   {
    "n": 38,
    "q": "Năng lượng hóa học được trữ trong sản phẩm quang hợp (Glucose) có nguồn gốc ban đầu từ:",
    "o": [
     "Năng lượng nhiệt của Trái Đất",
     "Năng lượng ánh sáng mặt trời",
     "Năng lượng hóa học của nước",
     "Năng lượng liên kết của CO<sub>2</sub>"
    ],
    "a": 1,
    "exp": "Mọi năng lượng hóa học chứa trong phân tử đường Glucose đều có nguồn gốc nguyên thủy từ năng lượng bức xạ ánh sáng mặt trời đã được cố định lại trong pha sáng."
   },
   {
    "n": 39,
    "q": "Đơn vị cấu trúc cơ bản của màng thylakoid thực hiện pha sáng được gọi là:",
    "o": [
     "Quang hệ (Photosystem I & II)",
     "Chu trình Calvin",
     "Không bào",
     "Ti thể"
    ],
    "a": 0,
    "exp": "Quang hệ (Photosystem I và Photosystem II) là đơn vị tổ chức chức năng cơ bản trên màng thylakoid, gồm phức hệ anten thu nhận ánh sáng và trung tâm phản ứng quang hóa."
   },
   {
    "n": 40,
    "q": "Chất trung gian nhận electron cuối cùng trong chuỗi truyền electron của pha sáng là:",
    "o": [
     "O<sub>2</sub>",
     "NADP<sup>+</sup> (tạo thành NADPH)",
     "CO<sub>2</sub>",
     "Pyruvate"
    ],
    "a": 1,
    "exp": "NADP+ là chất nhận electron cuối cùng trong chuỗi truyền electron không vòng của pha sáng; khi nhận 2 electron và 1 ion H+, nó bị khử thành NADPH."
   },
   {
    "n": 41,
    "q": "Tại sao thực vật được gọi là sinh vật tự dưỡng?",
    "o": [
     "Vì chúng tự di chuyển để tìm kiếm thức ăn",
     "Vì chúng tự tổng hợp chất hữu cơ từ các chất vô cơ (CO<sub>2</sub>,H<sub>2</sub>O) nhờ năng lượng ánh sáng",
     "Vì chúng không cần chất dinh dưỡng để sống",
     "Vì chúng hấp thụ chất hữu cơ trực tiếp từ đất"
    ],
    "a": 1,
    "exp": "Thực vật được gọi là sinh vật tự dưỡng (autotrophs) vì chúng tự mình tổng hợp được toàn bộ các hợp chất hữu cơ cần thiết từ các chất vô cơ đơn giản (CO2 và H2O) nhờ năng lượng ánh sáng mặt trời."
   },
   {
    "n": 42,
    "q": "Nếu loại bỏ hoàn toàn diệp lục tố khỏi lá, điều gì sẽ xảy ra?",
    "o": [
     "Lá vẫn quang hợp bình thường nhờ chất nền Stroma",
     "Lá không thể hấp thụ năng lượng ánh sáng, quá trình quang hợp dừng lại",
     "Lá chuyển sang hấp thụ CO<sub>2</sub> mạnh hơn",
     "Cây sẽ chuyển sang hô hấp hiếu khí thay cho quang hợp"
    ],
    "a": 1,
    "exp": "Diệp lục tố là sắc tố quang hợp bắt buộc; nếu không có diệp lục thì tế bào không thể bẫy được năng lượng ánh sáng để quang phân ly nước và tạo ATP/NADPH, khiến toàn bộ quá trình quang hợp dừng lại."
   },
   {
    "n": 43,
    "q": "Điểm khác biệt cơ bản giữa tế bào lục mô và tế bào biểu bì lá là:",
    "o": [
     "Tế bào lục mô chứa nhiều lục lạp, tế bào biểu bì thông thường không chứa lục lạp",
     "Tế bào biểu bì thực hiện toàn bộ quá trình quang hợp",
     "Tế bào lục mô nằm ở mặt ngoài của lá",
     "Tế bào biểu bì chứa nhiều diệp lục tố hơn tế bào lục mô"
    ],
    "a": 0,
    "exp": "Tế bào lục mô chứa mật độ lục lạp rất cao và là nơi diễn ra quang hợp chủ lực; trong khi đó các tế bào biểu bì thông thường không chứa lục lạp và trong suốt để ánh sáng đi xuyên qua."
   },
   {
    "n": 44,
    "q": "Sự trao đổi khí CO<sub>2</sub> và O<sub>2</sub> qua khí khẩu diễn ra theo cơ chế nào?",
    "o": [
     "Vận chuyển chủ động cần ATP",
     "Khuếch tán thụ động",
     "Bơm ion",
     "Đồng vận chuyển"
    ],
    "a": 1,
    "exp": "Khí CO2 khuếch tán từ khí quyển vào khoang gian bào và O2 khuếch tán từ lá ra ngoài môi trường hoàn toàn theo cơ chế Khuếch tán thụ động xuôi theo gradient áp suất riêng phần."
   },
   {
    "n": 45,
    "q": "Trong điều kiện ánh sáng đầy đủ nhưng thiếu CO<sub>2</sub>, quá trình nào sau đây sẽ bị dừng lại?",
    "o": [
     "Quá trình hấp thụ ánh sáng của diệp lục",
     "Chu trình cố định carbon (pha tối)",
     "Quá trình quang phân li nước",
     "Sự kích thích electron ở chlorophyll"
    ],
    "a": 1,
    "exp": "Thiếu khí CO2 làm thiếu cơ chất cho enzyme Rubisco, khiến chu trình Calvin (pha tối) không thể vận hành và dừng lại ngay lập tức."
   },
   {
    "n": 46,
    "q": "Màng thylakoid có đặc điểm cấu tạo phù hợp với chức năng pha sáng là:",
    "o": [
     "Có diện tích bề mặt lớn và chứa hệ sắc tố cùng các chuỗi truyền electron",
     "Hoàn toàn trong suốt đối với ánh sáng",
     "Không cho nước đi qua",
     "Dày hơn màng ngoài của lục lạp gấp nhiều lần"
    ],
    "a": 0,
    "exp": "Màng thylakoid xếp nếp tạo diện tích bề mặt tiếp xúc khổng lồ, chứa hàng triệu phân tử sắc tố quang hợp cùng các chuỗi truyền electron, tối ưu hóa hiệu suất quang hóa của pha sáng."
   },
   {
    "n": 47,
    "q": "Phát biểu nào sau đây SAI về quang hợp?",
    "o": [
     "Quang hợp tạo ra O<sub>2</sub> cung cấp cho sự hô hấp của các sinh vật",
     "Tất cả các loài vi khuẩn đều không thể quang hợp",
     "Lá là cơ quan quang hợp chủ yếu của thực vật",
     "Diệp lục tố nằm trên màng thylakoid"
    ],
    "a": 1,
    "exp": "Phát biểu B sai vì có nhiều nhóm vi khuẩn quang hợp được (như vi khuẩn lam có quang hợp thải oxy, vi khuẩn lưu huỳnh màu tía quang hợp không thải oxy)."
   },
   {
    "n": 48,
    "q": "Khái niệm \"Grana\" trong lục lạp chỉ:",
    "o": [
     "Tập hợp các màng thylakoid xếp chồng lên nhau",
     "Dung dịch lỏng chứa enzyme",
     "Lỗ rỗng trên bề mặt lá",
     "Tế bào bao quanh bó mạch"
    ],
    "a": 0,
    "exp": "Khái niệm 'Grana' (số ít là Granum) dùng để chỉ các chồng màng túi thylakoid hình đĩa dẹp xếp chồng trật tự lên nhau bên trong lòng lục lạp."
   },
   {
    "n": 49,
    "q": "Ý nghĩa của sự sắp xếp các tế bào lục mô trong lá là gì?",
    "o": [
     "Tối ưu hóa khả năng hấp thụ ánh sáng và trao đổi khí",
     "Bảo vệ lá khỏi các loài côn trùng",
     "Ngăn chặn sự thoát hơi nước hoàn toàn",
     "Tăng độ cứng cáp cho lá"
    ],
    "a": 0,
    "exp": "Các tế bào lục mô (gồm mô giậu xếp thẳng đứng thu nhận ánh sáng tối đa và mô khuyết xốp chứa nhiều khoang rỗng chứa khí) giúp tối ưu hóa cả khả năng hấp thụ photon lẫn trao đổi khí CO2."
   },
   {
    "n": 50,
    "q": "Vai trò quan trọng nhất của quang hợp đối với sự sống trên Trái Đất là:",
    "o": [
     "Cung cấp nguồn chất hữu cơ và năng lượng cho chuỗi thức ăn, đồng thời cân bằng khí O<sub>2</sub>/CO<sub>2</sub> trong khí quyển",
     "Giúp thực vật phát triển chiều cao nhanh chóng",
     "Làm giảm nhiệt độ toàn cầu bằng cách hút hết nhiệt năng",
     "Tạo ra nước cung cấp cho mạch nước ngầm"
    ],
    "a": 0,
    "exp": "Ý nghĩa sinh thái vĩ đại nhất của quang hợp là tạo ra sinh khối hữu cơ nuôi sống toàn bộ mạng lưới thức ăn của sinh giới, đồng thời duy trì và cân bằng tỷ lệ khí O2 và CO2 trong khí quyển Trái Đất."
   }
  ]
 },
 {
  "id": "c4",
  "title": "Chương 5: Hô hấp tế bào & Trao đổi chất",
  "short": "Hô hấp",
  "questions": [
   {
    "n": 1,
    "q": "Tế bào được coi là một:",
    "o": [
     "Cơ quan sản xuất năng lượng độc lập",
     "Nhà máy hóa học thu nhỏ",
     "Hệ thống trao đổi khí đơn thuần",
     "Cấu trúc cố định không biến đổi"
    ],
    "a": 1,
    "exp": "Tế bào sống là một nhà máy hóa sinh thu nhỏ: hàng ngàn phản ứng hóa học khác nhau liên tục diễn ra đồng thời trong một không gian cực nhỏ được màng bao bọc và kiểm soát tinh vi."
   },
   {
    "n": 2,
    "q": "Tập hợp tất cả các phản ứng hóa học xảy ra trong một cơ thể sống được gọi là:",
    "o": [
     "Đồng hóa",
     "Dị hóa",
     "Trao đổi chất (Metabolism)",
     "Hô hấp tế bào"
    ],
    "a": 2,
    "exp": "Trao đổi chất (Metabolism) là tập hợp của toàn bộ các phản ứng hóa học và chuyển hóa năng lượng diễn ra trong một cơ thể sống để duy trì sự sống."
   },
   {
    "n": 3,
    "q": "Lộ trình trao đổi chất (metabolic pathway) diễn ra theo trật tự nào?",
    "o": [
     "Sản phẩm → Phản ứng → Cơ chất",
     "Cơ chất → Các bước trung gian (xúc tác bởi enzyme) → Sản phẩm",
     "Enzyme → Cơ chất → Năng lượng",
     "Cơ chất → Sản phẩm → Enzyme"
    ],
    "a": 1,
    "exp": "Lộ trình trao đổi chất (Metabolic pathway) bắt đầu từ một phân tử cơ chất ban đầu, đi qua một chuỗi các bước biến đổi trung gian (mỗi bước do một enzyme đặc hiệu xúc tác) để tạo ra sản phẩm cuối cùng."
   },
   {
    "n": 4,
    "q": "Mỗi bước trong một lộ trình trao đổi chất được xúc tác bởi:",
    "o": [
     "Một loại hormone",
     "Một loại lipid",
     "Một enzyme đặc hiệu",
     "Phân tử ATP"
    ],
    "a": 2,
    "exp": "Mỗi bước phản ứng trong một con đường chuyển hóa đều đòi hỏi một loại enzyme xúc tác đặc hiệu tương ứng để giảm năng lượng hoạt hóa và định hướng phản ứng."
   },
   {
    "n": 5,
    "q": "Quá trình đồng hóa (anabolism) là quá trình:",
    "o": [
     "Phân giải các phân tử phức tạp thành các phân tử đơn giản và giải phóng năng lượng",
     "Sử dụng năng lượng để tổng hợp các phân tử phức tạp từ các phân tử đơn giản",
     "Biến đổi nhiệt năng thành động năng",
     "Giải phóng CO₂ và H₂O"
    ],
    "a": 1,
    "exp": "Quá trình đồng hóa (Anabolism) là các con đường sử dụng năng lượng (phản ứng thu năng lượng) để tổng hợp nên các phân tử hữu cơ phức tạp từ các phân tử đơn giản (ví dụ: tổng hợp protein từ amino acid)."
   },
   {
    "n": 6,
    "q": "Quá trình dị hóa (catabolism) là quá trình:",
    "o": [
     "Sử dụng ATP để tổng hợp protein",
     "Phân giải các phân tử phức tạp thành các phân tử đơn giản và giải phóng năng lượng",
     "Tích trữ năng lượng dưới dạng hóa năng",
     "Hấp thụ quang năng để tạo glucose"
    ],
    "a": 1,
    "exp": "Quá trình dị hóa (Catabolism) là các con đường phân giải các hợp chất hữu cơ phức tạp thành các phân tử đơn giản hơn và giải phóng năng lượng (ví dụ: hô hấp tế bào phân giải glucose)."
   },
   {
    "n": 7,
    "q": "Dạng năng lượng trực tiếp mà tế bào sử dụng cho các hoạt động sống là:",
    "o": [
     "Quang năng",
     "Nhiệt năng",
     "ATP",
     "Động năng"
    ],
    "a": 2,
    "exp": "Phân tử ATP (Adenosine Triphosphate) là dạng năng lượng tự do trực tiếp mà mọi tế bào đều có thể sử dụng ngay để thực hiện các công tế bào."
   },
   {
    "n": 8,
    "q": "Năng lượng giải phóng từ con đường dị hóa được dùng để:",
    "o": [
     "Tổng hợp ATP từ ADP và Pi",
     "Phân hủy ATP thành ADP",
     "Biến đổi nhiệt năng thành quang năng",
     "Tiêu giảm năng lượng thừa"
    ],
    "a": 0,
    "exp": "Năng lượng giải phóng ra từ các phản ứng dị hóa được dùng để tái nạp nhóm phosphate vô cơ (Pi) vào phân tử ADP nhằm tổng hợp lại ATP."
   },
   {
    "n": 9,
    "q": "Phản ứng nào sau đây thể hiện sự giải phóng năng lượng cho hoạt động tế bào?",
    "o": [
     "ADP + Pi → ATP + H<sub>2</sub>O",
     "ATP + H<sub>2</sub>O → ADP + Pi + Năng lượng",
     "Glucose + ATP → Pyruvate",
     "CO<sub>2</sub> + H<sub>2</sub>O → Glucose"
    ],
    "a": 1,
    "exp": "Sự thủy phân liên kết photphat cao năng cuối cùng trong ATP: ATP + H2O -> ADP + Pi + Năng lượng giải phóng khoảng 7.3 kcal/mol năng lượng tự do cung cấp cho tế bào."
   },
   {
    "n": 10,
    "q": "Dòng năng lượng đi vào hệ sinh thái bắt nguồn từ đâu và mất đi dưới dạng nào?",
    "o": [
     "Từ thức ăn, mất đi dưới dạng hóa năng",
     "Từ ánh sáng mặt trời, mất đi dưới dạng nhiệt",
     "Từ đất, mất đi dưới dạng quang năng",
     "Từ không khí, mất đi dưới dạng động năng"
    ],
    "a": 1,
    "exp": "Dòng năng lượng trong sinh quyển bắt nguồn từ năng lượng bức xạ ánh sáng mặt trời đi vào sinh vật sản xuất qua quang hợp, sau đó chuyển qua chuỗi thức ăn và cuối cùng thất thoát ra môi trường dưới dạng nhiệt."
   },
   {
    "n": 11,
    "q": "Sản phẩm của quá trình quang hợp phục vụ trực tiếp cho hô hấp tế bào là:",
    "o": [
     "CO<sub>2</sub> và H<sub>2</sub>O",
     "O<sub>2</sub> và các chất hữu cơ",
     "ATP và NADPH",
     "N<sub>2</sub> và Glucose"
    ],
    "a": 1,
    "exp": "Sản phẩm của quang hợp là khí Oxygen (O2) và các hợp chất hữu cơ (Glucose) chính là nguồn nguyên liệu đầu vào thiết yếu cho quá trình hô hấp tế bào."
   },
   {
    "n": 12,
    "q": "Hô hấp tế bào là quá trình tế bào chuyển hóa hóa năng trong phân tử hữu cơ thành:",
    "o": [
     "Quang năng",
     "ATP",
     "Cơ năng thuần túy",
     "Điện năng"
    ],
    "a": 1,
    "exp": "Hô hấp tế bào là chuỗi phản ứng dị hóa chuyển hóa năng lượng dự trữ trong các liên kết hóa học của phân tử hữu cơ thành năng lượng sẵn sàng sử dụng trong phân tử ATP."
   },
   {
    "n": 13,
    "q": "Năng lượng tồn tại trong các liên kết hóa học của phân tử hữu cơ thuộc dạng nào?",
    "o": [
     "Động năng",
     "Hóa năng (Thế năng hóa học)",
     "Nhiệt năng",
     "Quang năng"
    ],
    "a": 1,
    "exp": "Năng lượng dự trữ trong các liên kết hóa học giữa các nguyên tử của phân tử chất hữu cơ là một dạng Thế năng hóa học (Hóa năng)."
   },
   {
    "n": 14,
    "q": "Động năng là dạng năng lượng:",
    "o": [
     "Tích trữ do vị trí hoặc cấu trúc",
     "Gắn liền với sự chuyển động của các vật thể",
     "Lưu trữ trong các liên kết hóa học",
     "Được giải phóng dưới dạng ánh sáng"
    ],
    "a": 1,
    "exp": "Động năng (Kinetic energy) là dạng năng lượng gắn liền với chuyển động của vật thể hoặc các phân tử, bao gồm cả nhiệt năng và chuyển động cơ học."
   },
   {
    "n": 15,
    "q": "Phát quang sinh học ở một số sinh vật là ví dụ về sự biến đổi năng lượng từ:",
    "o": [
     "Quang năng thành hóa năng",
     "Hóa năng thành ánh sáng (quang năng)",
     "Nhiệt năng thành cơ năng",
     "Động năng thành thế năng"
    ],
    "a": 1,
    "exp": "Sự phát quang sinh học (bioluminescence) ở đom đóm hay sinh vật biển là sự chuyển hóa hóa năng (nhờ enzyme luciferase xúc tác phân giải luciferin cùng ATP) trực tiếp thành quang năng phát sáng lạnh."
   },
   {
    "n": 16,
    "q": "Trong tế bào, enzyme đóng vai trò:",
    "o": [
     "Nguồn cung cấp năng lượng",
     "Chất xúc tác sinh học làm tăng tốc độ phản ứng",
     "Chất mang thông tin di truyền",
     "Thành phần cấu tạo chính của màng"
    ],
    "a": 1,
    "exp": "Enzyme là chất xúc tác sinh học (phần lớn có bản chất là protein) có khả năng làm tăng tốc độ phản ứng lên hàng triệu lần mà không bị tiêu hao hay biến đổi vĩnh viễn sau phản ứng."
   },
   {
    "n": 17,
    "q": "Cơ chất (Substrate) là:",
    "o": [
     "Sản phẩm cuối cùng của phản ứng",
     "Chất tham gia phản ứng được enzyme xúc tác",
     "Phân tử ATP cung cấp năng lượng",
     "Enzyme ở trạng thái bất hoạt"
    ],
    "a": 1,
    "exp": "Cơ chất (Substrate) là chất phản ứng đặc hiệu mà enzyme gắn vào tại trung tâm hoạt động (active site) để xúc tác phản ứng chuyển hóa thành sản phẩm."
   },
   {
    "n": 18,
    "q": "Điều nào sau đây mô tả ĐÚNG về chu trình ATP - ADP?",
    "o": [
     "ATP mất đi một nhóm phosphate thành ADP và giải phóng năng lượng; ADP nhận nhóm phosphate để tái tạo ATP",
     "ATP thu năng lượng để biến thành ADP",
     "Quá trình chuyển ATP thành ADP chỉ xảy ra khi tế bào nghỉ ngơi",
     "Tế bào lưu trữ một lượng ATP cố định không cần tái tạo"
    ],
    "a": 0,
    "exp": "Chu trình ATP-ADP là cơ chế liên hợp năng lượng: khi thủy phân ATP giải phóng nhóm phosphate và năng lượng; khi dị hóa tạo năng lượng, ADP lại nhận phosphate để tái tạo phân tử ATP mới."
   },
   {
    "n": 19,
    "q": "Mối quan hệ giữa quang hợp và hô hấp tế bào là:",
    "o": [
     "Cùng tiêu thụ O<sub>2</sub> và giải phóng CO<sub>2</sub>",
     "Sản phẩm của quang hợp là nguyên liệu cho hô hấp tế bào và ngược lại",
     "Quang hợp diễn ra ở động vật, hô hấp diễn ra ở thực vật",
     "Không có mối quan hệ nào"
    ],
    "a": 1,
    "exp": "Quang hợp và hô hấp tế bào là hai quá trình trao đổi chất đối lập nhưng thống nhất: sản phẩm của quang hợp (Glucose, O2) là nguyên liệu cho hô hấp; ngược lại sản phẩm hô hấp (CO2, H2O) lại là nguyên liệu cho quang hợp."
   },
   {
    "n": 20,
    "q": "Thành phần cấu tạo của phân tử ATP gồm:",
    "o": [
     "Adenine, đường Ribose và 3 nhóm Phosphate",
     "Guanine, đường Deoxyribose và 3 nhóm Phosphate",
     "Adenine, đường Deoxyribose và 2 nhóm Phosphate",
     "Cytosine, đường Ribose và 3 nhóm Phosphate"
    ],
    "a": 0,
    "exp": "Cấu tạo của phân tử ATP gồm 3 phần: bazơ nitơ Adenine, đường pentose Ribose và chuỗi gồm 3 nhóm Phosphate liên kết với nhau bằng liên kết phosphoanhydride cao năng."
   },
   {
    "n": 21,
    "q": "Sự thủy phân ATP là một phản ứng:",
    "o": [
     "Thu nhiệt",
     "Tỏa năng lượng (giải phóng năng lượng)",
     "Không làm thay đổi năng lượng",
     "Tổng hợp chất hữu cơ"
    ],
    "a": 1,
    "exp": "Sự thủy phân ATP phá vỡ liên kết phosphate cao năng là một phản ứng tỏa năng lượng (exergonic reaction), giải phóng năng lượng tự do phục vụ công sống."
   },
   {
    "n": 22,
    "q": "Nhóm sinh vật nào chuyển hóa quang năng thành hóa năng trong chất hữu cơ?",
    "o": [
     "Sinh vật dị dưỡng",
     "Sinh vật tự dưỡng (quang dưỡng)",
     "Sinh vật phân giải",
     "Động vật ăn thịt"
    ],
    "a": 1,
    "exp": "Nhóm sinh vật tự dưỡng quang dưỡng (thực vật, tảo, vi khuẩn lam) có sắc tố quang hợp giúp hấp thu quang năng mặt trời và biến đổi thành hóa năng trong các chất hữu cơ."
   },
   {
    "n": 23,
    "q": "Các dạng năng lượng có thể chuyển hóa qua lại trong tế bào NGOẠI TRỪ:",
    "o": [
     "Hóa năng → Động năng",
     "Quang năng → Hóa năng",
     "Hóa năng → Nhiệt năng",
     "Nhiệt năng → Hóa năng (tế bào không dùng nhiệt năng làm nguồn năng lượng tổng hợp)"
    ],
    "a": 3,
    "exp": "Tế bào không thể sử dụng nhiệt năng làm nguồn năng lượng để thực hiện công tổng hợp hóa học, vì tế bào là hệ đẳng nhiệt (nhiệt độ đồng đều) nên không thể chuyển nhiệt thành công như động cơ nhiệt."
   },
   {
    "n": 24,
    "q": "Khi tế bào thực hiện công (như co cơ, vận chuyển chủ động), năng lượng trực tiếp lấy từ:",
    "o": [
     "Glucose",
     "Khí O<sub>2</sub>",
     "Thủy phân ATP",
     "Tinh bột"
    ],
    "a": 2,
    "exp": "Năng lượng phục vụ trực tiếp cho các công của tế bào (công cơ học như co cơ, công vận chuyển chủ động, công hóa học tổng hợp) đều bắt nguồn từ năng lượng giải phóng khi thủy phân phân tử ATP."
   },
   {
    "n": 25,
    "q": "Quá trình tổng hợp Protein từ các Amino acid là ví dụ của:",
    "o": [
     "Dị hóa",
     "Đồng hóa",
     "Hô hấp",
     "Phân giải"
    ],
    "a": 1,
    "exp": "Tổng hợp chuỗi Polypeptide (protein) từ các đơn phân amino acid là quá trình liên kết các phân tử nhỏ thành đại phân tử phức tạp, tiêu tốn năng lượng nên là ví dụ điển hình của con đường Đồng hóa."
   },
   {
    "n": 26,
    "q": "Quá trình phân giải Glucose thành CO<sub>2</sub> và H<sub>2</sub>O là ví dụ của:",
    "o": [
     "Dị hóa",
     "Đồng hóa",
     "Quang hợp",
     "Tích trữ năng lượng"
    ],
    "a": 0,
    "exp": "Phân giải phân tử đường Glucose (C6H12O6) thành các phân tử vô cơ đơn giản CO2 và H2O giải phóng năng lượng là ví dụ điển hình của con đường Dị hóa."
   },
   {
    "n": 27,
    "q": "Trong lộ trình trao đổi chất A →(E<sub>1</sub>) B →(E<sub>2</sub>) C →(E<sub>3</sub>) D, chất B đóng vai trò là:",
    "o": [
     "Cơ chất của Enzyme 1 và Sản phẩm của Enzyme 2",
     "Sản phẩm của Enzyme 1 và Cơ chất của Enzyme 2",
     "Chất xúc tác",
     "Phân tử năng lượng"
    ],
    "a": 1,
    "exp": "Trong chuỗi phản ứng nối tiếp A --(E1)--> B --(E2)--> C: B là sản phẩm do enzyme E1 tạo ra, đồng thời là cơ chất đầu vào để enzyme E2 tiếp tục xúc tác chuyển thành C."
   },
   {
    "n": 28,
    "q": "Hô hấp tế bào xẩy ra ở đâu trong tế bào nhân thực?",
    "o": [
     "Lưới nội chất",
     "Bộ máy Golgi",
     "Ti thể (và tế bào chất)",
     "Nhân tế bào"
    ],
    "a": 2,
    "exp": "Ở tế bào nhân thực, hô hấp tế bào hiếu khí diễn ra tại hai địa điểm chính: giai đoạn đường phân diễn ra tại Tế bào chất (bào tương), các giai đoạn còn lại diễn ra trong Ti thể."
   },
   {
    "n": 29,
    "q": "Quá trình nào giải phóng nhiều năng lượng nhất trong chuyển hóa vật chất?",
    "o": [
     "Đồng hóa",
     "Hô hấp tế bào (Dị hóa hiếu khí)",
     "Vận chuyển thụ động",
     "Nhân đôi DNA"
    ],
    "a": 1,
    "exp": "Hô hấp tế bào hiếu khí (phân giải hoàn toàn glucose thành CO2 và H2O với sự có mặt của O2) giải phóng năng lượng tự do nhiều nhất trong các con đường chuyển hóa năng lượng (tạo 30-32 ATP/glucose)."
   },
   {
    "n": 30,
    "q": "Nguyên liệu đầu vào của quá trình hô hấp tế bào thường là:",
    "o": [
     "CO<sub>2</sub> và H<sub>2</sub>O",
     "Glucose và O<sub>2</sub>",
     "ATP và O<sub>2</sub>",
     "Amino acid và CO<sub>2</sub>"
    ],
    "a": 1,
    "exp": "Nguyên liệu cơ bản đầu vào của quá trình hô hấp hiếu khí là phân tử carbohydrate (Glucose) và dưỡng khí (O2)."
   },
   {
    "n": 31,
    "q": "Sản phẩm cuối cùng của hô hấp tế bào hiếu khí là:",
    "o": [
     "Glucose và O<sub>2</sub>",
     "CO<sub>2</sub>, H<sub>2</sub>O và ATP",
     "Pyruvate và Lactic acid",
     "Ethanol và CO<sub>2</sub>"
    ],
    "a": 1,
    "exp": "Sản phẩm cuối cùng của quá trình hô hấp tế bào hiếu khí khi phân giải hoàn toàn 1 phân tử glucose gồm có 6 phân tử CO2, 6 phân tử H2O và khoảng 30 - 32 phân tử ATP."
   },
   {
    "n": 32,
    "q": "Năng lượng thất thoát dưới dạng nhiệt trong hô hấp tế bào có vai trò:",
    "o": [
     "Cung cấp năng lượng co cơ",
     "Duy trì thân nhiệt cho sinh vật biến nhiệt/đẳng nhiệt",
     "Xúc tác cho enzyme",
     "Tổng hợp glucose"
    ],
    "a": 1,
    "exp": "Một phần đáng kể năng lượng từ hô hấp tế bào bị thất thoát dưới dạng nhiệt năng (~66%), nhiệt này có vai trò sống còn trong việc sưởi ấm và duy trì nhiệt độ cơ thể ổn định cho động vật hằng nhiệt."
   },
   {
    "n": 33,
    "q": "Tại sao nói tế bào là một \"nhà máy hóa học thu nhỏ\"?",
    "o": [
     "Vì tế bào có kích thước lớn",
     "Vì trong tế bào liên tục xảy ra hàng ngàn phản ứng hóa học được điều hòa chặt chẽ",
     "Vì tế bào thải ra nhiều khói bụi",
     "Vì tế bào chỉ chế tạo ra ATP"
    ],
    "a": 1,
    "exp": "Tế bào được ví như 'nhà máy hóa học thu nhỏ' vì trong thể tích siêu hiển vi của tế bào liên tục xảy ra hàng ngàn phản ứng hóa sinh đồng thời được điều hòa, kiểm soát cực kỳ chính xác và nhịp nhàng."
   },
   {
    "n": 34,
    "q": "Enzyme có tính chất nào sau đây?",
    "o": [
     "Bị biến đổi sau khi phản ứng kết thúc",
     "Có tính đặc hiệu cao với cơ chất",
     "Phản ứng với mọi loại chất",
     "Cung cấp nhiệt năng cho phản ứng"
    ],
    "a": 1,
    "exp": "Enzyme có tính đặc hiệu rất cao (tính chọn lọc cơ chất): mỗi enzyme chỉ nhận diện và xúc tác cho một hoặc một nhóm rất hẹp các cơ chất có cấu hình phù hợp với trung tâm hoạt động của nó."
   },
   {
    "n": 35,
    "q": "Khi liên kết phosphate cao năng trong ATP bị phá vỡ, sản phẩm thu được gồm:",
    "o": [
     "ADP + Pi + Năng lượng",
     "AMP + Glucose",
     "Adenine + Ribose",
     "ATP + Nhiệt"
    ],
    "a": 0,
    "exp": "Khi liên kết phosphate cuối cùng của ATP bị cắt đứt trong phản ứng thủy phân, phân tử biến đổi thành Adenosine diphosphate (ADP), nhóm phosphate vô cơ tự do (Pi) và giải phóng năng lượng."
   },
   {
    "n": 36,
    "q": "Sinh vật nào thu nhận năng lượng bằng cách tiêu thụ sinh vật khác?",
    "o": [
     "Thực vật",
     "Tảo",
     "Động vật (Sinh vật dị dưỡng)",
     "Vi khuẩn quang hợp"
    ],
    "a": 2,
    "exp": "Sinh vật dị dưỡng (như động vật, nấm, nhiều vi khuẩn) không thể tự tổng hợp chất hữu cơ từ CO2 mà phải lấy năng lượng bằng cách tiêu thụ các sinh vật khác hoặc chất hữu cơ từ môi trường."
   },
   {
    "n": 37,
    "q": "Nguồn năng lượng sơ cấp cho mọi hoạt động sống trên Trái Đất là:",
    "o": [
     "Năng lượng hạt nhân",
     "Ánh sáng Mặt Trời",
     "Năng lượng nhiệt đới",
     "Năng lượng gió"
    ],
    "a": 1,
    "exp": "Mặt Trời là nguồn cung cấp năng lượng sơ cấp vô tận cho toàn bộ hệ sinh thái trên Trái Đất thông qua việc cung cấp quang năng cho sinh vật tự dưỡng quang hợp."
   },
   {
    "n": 38,
    "q": "Đặc điểm của quá trình đồng hóa là:",
    "o": [
     "Phản ứng tỏa năng lượng",
     "Phản ứng thu năng lượng (Endorgonic)",
     "Phân giải chất phức tạp",
     "Không cần enzyme"
    ],
    "a": 1,
    "exp": "Các phản ứng của con đường đồng hóa đòi hỏi phải đầu tư năng lượng tự do từ bên ngoài vào để tạo liên kết mới, do đó có bản chất là phản ứng thu năng lượng (endergonic reaction)."
   },
   {
    "n": 39,
    "q": "Đặc điểm của quá trình dị hóa là:",
    "o": [
     "Phản ứng thu năng lượng",
     "Phản ứng phát năng lượng (Exergonic)",
     "Tổng hợp đại phân tử",
     "Tăng kích thước tế bào"
    ],
    "a": 1,
    "exp": "Các phản ứng của con đường dị hóa bẻ gãy các liên kết hóa học giàu năng lượng và giải phóng năng lượng tự do ra môi trường, do đó là các phản ứng phát năng lượng (exergonic reaction)."
   },
   {
    "n": 40,
    "q": "Sự chuyển hóa năng lượng nào xảy ra trong quá trình Quang hợp?",
    "o": [
     "Hóa năng → Quang năng",
     "Quang năng → Hóa năng",
     "Nhiệt năng → Cơ năng",
     "Động năng → Quang năng"
    ],
    "a": 1,
    "exp": "Trong quang hợp, năng lượng ánh sáng mặt trời (quang năng) được hấp thu và chuyển hóa thành năng lượng trong các liên kết hóa học của đường hữu cơ (hóa năng)."
   },
   {
    "n": 41,
    "q": "Sự chuyển hóa năng lượng nào xảy ra trong quá trình Hô hấp tế bào?",
    "o": [
     "Quang năng → Hóa năng",
     "Hóa năng (trong Glucose) → Hóa năng (trong ATP) + Nhiệt năng",
     "Nhiệt năng → Hóa năng",
     "Hóa năng → Quang năng"
    ],
    "a": 1,
    "exp": "Hô hấp tế bào chuyển hóa hóa năng lưu trữ trong phân tử Glucose thành hóa năng dự trữ trong ATP (khoảng 34%) và phần còn lại giải phóng dưới dạng nhiệt năng (khoảng 66%)."
   },
   {
    "n": 42,
    "q": "Chu trình nào mô tả sự liên kết giữa đồng hóa và dị hóa trong tế bào?",
    "o": [
     "Chu trình Carbon",
     "Chu trình ATP - ADP",
     "Chu trình Nitơ",
     "Chu trình H₂O"
    ],
    "a": 1,
    "exp": "Chu trình ATP-ADP liên kết chặt chẽ hai nhánh trao đổi chất: các phản ứng dị hóa phát năng lượng để tổng hợp ATP từ ADP, sau đó ATP lại thủy phân để cung cấp năng lượng thúc đẩy các phản ứng đồng hóa."
   },
   {
    "n": 43,
    "q": "Nếu một bước trong con đường chuyển hóa bị lỗi (enzyme bị hỏng), điều gì sẽ xảy ra?",
    "o": [
     "Toàn bộ con đường dừng lại hoặc sản phẩm trung gian bị ứ đọng",
     "Con đường tự động bỏ qua bước đó",
     "Tế bào tạo ra nhiều ATP hơn",
     "Không có ảnh hưởng gì"
    ],
    "a": 0,
    "exp": "Một con đường trao đổi chất hoạt động như một dây chuyền sản xuất: nếu một enzyme ở bất kỳ bước nào bị khiếm khuyết hoặc ức chế, toàn bộ con đường sẽ bị tắc nghẽn, làm chất trung gian trước bước đó bị ứ đọng."
   },
   {
    "n": 44,
    "q": "ATP được gọi là \"đồng tiền năng lượng\" của tế bào vì:",
    "o": [
     "Nó có giá trị kinh tế cao",
     "Tế bào có thể sử dụng nó dễ dàng cho nhiều hoạt động sống khác nhau",
     "Nó chứa lượng năng lượng lớn nhất trong các hợp chất",
     "Nó không bao giờ bị phân hủy"
    ],
    "a": 1,
    "exp": "ATP được gọi là 'đồng tiền năng lượng chung' của tế bào vì nó mang cấu trúc phổ biến, dễ dàng thủy phân để giải phóng một lượng năng lượng vừa đủ cho hầu hết mọi loại phản ứng và công việc tế bào."
   },
   {
    "n": 45,
    "q": "Vai trò của O<sub>2</sub> trong hô hấp tế bào hiếu khí là:",
    "o": [
     "Chất nhận electron cuối cùng",
     "Chất xúc tác phản ứng",
     "Cơ chất đầu vào của đường phân",
     "Phân tử lưu trữ năng lượng"
    ],
    "a": 0,
    "exp": "Trong hô hấp tế bào hiếu khí, phân tử O2 đóng vai trò là chất nhận electron cuối cùng ở cuối chuỗi truyền electron, kết hợp với các ion H+ để tạo thành phân tử nước H2O."
   },
   {
    "n": 46,
    "q": "Quá trình nào sau đây KHÔNG cần cung cấp năng lượng ATP?",
    "o": [
     "Co cơ",
     "Vận chuyển chủ động qua màng",
     "Khuếch tán thụ động qua màng tế bào",
     "Tổng hợp Protein"
    ],
    "a": 2,
    "exp": "Khuếch tán thụ động là quá trình các phân tử tự do di chuyển xuôi chiều gradient nồng độ (từ nơi nồng độ cao đến nơi thấp) nhờ chuyển động nhiệt tự nhiên nên hoàn toàn không tiêu tốn ATP."
   },
   {
    "n": 47,
    "q": "Năng lượng tự do giải phóng từ phản ứng dị hóa được lưu trữ ngắn hạn dưới dạng:",
    "o": [
     "Glucose",
     "Tinh bột",
     "Liên kết phosphate cao năng trong ATP",
     "Mỡ"
    ],
    "a": 2,
    "exp": "Năng lượng tự do giải phóng ra từ quá trình dị hóa thức ăn được tế bào 'bắt giữ' và lưu trữ ngắn hạn dưới dạng các liên kết photphat cao năng trong phân tử ATP trước khi đem đi sử dụng."
   },
   {
    "n": 48,
    "q": "Cơ chế giúp enzyme gia tăng tốc độ phản ứng là:",
    "o": [
     "Cung cấp thêm nhiệt độ",
     "Giảm năng lượng hoạt hóa của phản ứng",
     "Tăng lượng cơ chất",
     "Thay đổi hằng số cân bằng"
    ],
    "a": 1,
    "exp": "Enzyme gia tăng tốc độ phản ứng bằng cách làm giảm năng lượng hoạt hóa (EA - Activation Energy) cần thiết để đưa các phân tử cơ chất lên trạng thái chuyển tiếp, giúp phản ứng xảy ra nhanh hơn ở nhiệt độ cơ thể."
   },
   {
    "n": 49,
    "q": "Sự phát quang sinh học ở đom đóm nhằm mục đích chính là:",
    "o": [
     "Giải phóng nhiệt thừa",
     "Giao tiếp, thu hút bạn đời hoặc xua đuổi kẻ thù",
     "Hấp thụ ánh sáng mặt trời",
     "Tái tạo Glucose"
    ],
    "a": 1,
    "exp": "Ở loài đom đóm, sự phát quang sinh học chủ yếu nhằm phát tín hiệu ánh sáng nhấp nháy đặc trưng để tìm kiếm, thu hút bạn tình trong mùa sinh sản hoặc xua đuổi kẻ thù săn mồi."
   },
   {
    "n": 50,
    "q": "Mối quan hệ giữa dị hóa, ATP và đồng hóa được mô tả đúng nhất là:",
    "o": [
     "Dị hóa giải phóng năng lượng → Tổng hợp ATP → ATP thủy phân cung cấp năng lượng cho Đồng hóa",
     "Đồng hóa tạo năng lượng → Tổng hợp ATP → Cung cấp cho Dị hóa",
     "Dị hóa sử dụng ATP → Đồng hóa tạo ra ATP",
     "ATP trực tiếp biến thành Glucose trong quá trình dị hóa"
    ],
    "a": 0,
    "exp": "Mô hình phối hợp năng lượng: Dị hóa thức ăn giải phóng năng lượng -> Tế bào dùng năng lượng này để tổng hợp ATP từ ADP và Pi -> ATP di chuyển đến nơi cần và thủy phân cung cấp năng lượng cho Đồng hóa."
   },
   {
    "n": 51,
    "q": "Phản ứng oxi hóa - khử (Redox) là phản ứng trong đó có sự chuyển dịch của:",
    "o": [
     "Proton (H<sup>+</sup>)",
     "Electron",
     "Nhóm phosphate",
     "Phân tử Glucose"
    ],
    "a": 1,
    "exp": "Phản ứng oxy hóa - khử (Redox) là phản ứng hóa học trong đó diễn ra sự chuyển giao một hoặc nhiều electron từ chất cho electron sang chất nhận electron."
   },
   {
    "n": 52,
    "q": "Trong phản ứng oxi hóa - khử, chất bị oxi hóa là chất:",
    "o": [
     "Nhận electron",
     "Mất (cho) electron",
     "Nhận phân tử hydrogen",
     "Không thay đổi điện tích"
    ],
    "a": 1,
    "exp": "Theo định nghĩa hóa sinh: Chất bị oxy hóa là chất cho (mất) electron hoặc nguyên tử hydro; ngược lại chất bị khử là chất nhận thêm electron hoặc hydro."
   },
   {
    "n": 53,
    "q": "Chất đóng vai trò là chất nhận electron (chất oxi hóa) phổ biến nhất trong các phản ứng dị hóa của hô hấp tế bào là:",
    "o": [
     "ADP",
     "NAD<sup>+</sup>",
     "CO<sub>2</sub>",
     "Lactic acid"
    ],
    "a": 1,
    "exp": "Phân tử NAD+ (Nicotinamide Adenine Dinucleotide) là coenzyme đóng vai trò là chất nhận electron và proton (chất oxy hóa) phổ biến nhất trong các phản ứng dị hóa hô hấp."
   },
   {
    "n": 54,
    "q": "Dạng giảm (đã nhận electron và proton) của NAD<sup>+</sup> là:",
    "o": [
     "FAD",
     "NADP<sup>+</sup>",
     "NADH",
     "ATP"
    ],
    "a": 2,
    "exp": "Khi phân tử NAD+ nhận 2 electron giàu năng lượng và 1 proton H+, nó bị khử thành dạng tích trữ năng lượng là NADH (chất khử)."
   },
   {
    "n": 55,
    "q": "Quá trình hô hấp hiếu khí gồm 4 giai đoạn chính theo đúng trật tự là:",
    "o": [
     "Đường phân → Chu trình Krebs → Oxi hóa Pyruvate → Chuỗi truyền electron",
     "Đường phân → Oxi hóa Pyruvate → Chu trình Krebs → Chuỗi truyền electron & Thẩm thấu hóa học",
     "Chu trình Krebs → Đường phân → Oxi hóa Pyruvate → Chuỗi truyền electron",
     "Oxi hóa Pyruvate → Đường phân → Chu trình Krebs → Thẩm thấu hóa học"
    ],
    "a": 1,
    "exp": "Hô hấp tế bào hiếu khí diễn ra tuần tự qua 4 giai đoạn chính: 1. Đường phân -> 2. Oxy hóa Pyruvate -> 3. Chu trình Krebs (chu trình acid citric) -> 4. Chuỗi truyền electron và Thẩm thấu hóa học (Phosphoryl hóa oxy hóa)."
   },
   {
    "n": 56,
    "q": "Giai đoạn Đường phân (Glycolysis) diễn ra tại vị trí nào trong tế bào?",
    "o": [
     "Màng trong ti thể",
     "Chất nền ti thể",
     "Tế bào chất (Bào tương)",
     "Nhân tế bào"
    ],
    "a": 2,
    "exp": "Giai đoạn Đường phân (Glycolysis) là con đường cổ xưa nhất của sinh giới, diễn ra hoàn toàn trong Tế bào chất (bào tương) và không cần sự tham gia của O2."
   },
   {
    "n": 57,
    "q": "Nguyên liệu đầu vào của giai đoạn Đường phân là:",
    "o": [
     "1 phân tử Glucose",
     "2 phân tử Pyruvate",
     "2 phân tử Acetyl-CoA",
     "6 phân tử CO<sub>2</sub>"
    ],
    "a": 0,
    "exp": "Nguyên liệu khởi đầu của đường phân là 1 phân tử đường 6-carbon Glucose (C6H12O6)."
   },
   {
    "n": 58,
    "q": "Kết thúc quá trình Đường phân, từ 1 phân tử Glucose tế bào thu được:",
    "o": [
     "2 Pyruvate, 2 ATP (ròng), 2 NADH",
     "2 Acetyl-CoA, 2 ATP, 2 FADH<sub>2</sub>",
     "6 CO<sub>2</sub>, 32 ATP",
     "2 Lactic acid, 2 ATP"
    ],
    "a": 0,
    "exp": "Kết thúc giai đoạn đường phân, 1 phân tử glucose bị phân cắt thành 2 phân tử 3-carbon Pyruvate, đồng thời tế bào thu được 2 NADH và 2 phân tử ATP ròng (tổng tạo 4 ATP nhưng đã đầu tư 2 ATP)."
   },
   {
    "n": 59,
    "q": "Trong giai đoạn đầu của Đường phân, tế bào phải \"đầu tư\" bao nhiêu phân tử ATP?",
    "o": [
     "1 ATP",
     "2 ATP",
     "4 ATP",
     "0 ATP"
    ],
    "a": 1,
    "exp": "Trong giai đoạn đầu của đường phân (pha đầu tư năng lượng), tế bào phải tiêu tốn 2 phân tử ATP để phosphoryl hóa phân tử đường, giúp hoạt hóa phân tử glucose."
   },
   {
    "n": 60,
    "q": "Sự hình thành ATP trong Đường phân và Chu trình Krebs diễn ra theo cơ chế:",
    "o": [
     "Phosphoryl hóa oxy hóa",
     "Phosphoryl hóa cấp tế bào (cơ chất)",
     "Quang phosphoryl hóa",
     "Thẩm thấu hóa học"
    ],
    "a": 1,
    "exp": "Sự hình thành ATP trong đường phân và chu trình Krebs diễn ra theo cơ chế Phosphoryl hóa mức cơ chất (Substrate-level phosphorylation): một enzyme chuyển trực tiếp nhóm phosphate từ phân tử cơ chất sang cho ADP."
   },
   {
    "n": 61,
    "q": "Sau khi kết thúc Đường phân, nếu có sự xuất hiện của O<sub>2</sub>, Pyruvate sẽ được vận chuyển vào:",
    "o": [
     "Tế bào chất",
     "Ti thể",
     "Không bào",
     "Bộ máy Golgi"
    ],
    "a": 1,
    "exp": "Sau khi kết thúc đường phân, nếu tế bào có đầy đủ O2, phân tử pyruvate sẽ được protein vận chuyển đưa xuyên qua màng ti thể đi vào Chất nền ti thể để tiếp tục bị oxy hóa."
   },
   {
    "n": 62,
    "q": "Quá trình oxi hóa Pyruvate diễn ra tại:",
    "o": [
     "Màng ngoài ti thể",
     "Màng trong ti thể",
     "Chất nền ti thể (Matrix)",
     "Tế bào chất"
    ],
    "a": 2,
    "exp": "Quá trình oxy hóa Pyruvate (chuyển hóa pyruvate thành Acetyl-CoA) diễn ra tại Chất nền ti thể (Mitochondrial Matrix)."
   },
   {
    "n": 63,
    "q": "Sản phẩm của bước Oxi hóa Pyruvate (tính cho 1 phân tử Glucose) gồm:",
    "o": [
     "2 Acetyl-CoA, 2 CO<sub>2</sub>, 2 NADH",
     "2 Pyruvate, 2 ATP, 2 NADH",
     "4 CO<sub>2</sub>, 2 ATP, 6 NADH",
     "2 Ethanol, 2 CO<sub>2</sub>"
    ],
    "a": 0,
    "exp": "Qua phản ứng oxy hóa 2 phân tử pyruvate (tính từ 1 glucose ban đầu), tế bào thu được: 2 phân tử Acetyl-CoA, giải phóng 2 phân tử CO2 và nạp 2 electron vào 2 phân tử NADH."
   },
   {
    "n": 64,
    "q": "Phân tử đi vào khởi đầu Chu trình Krebs là:",
    "o": [
     "Glucose",
     "Pyruvate",
     "Acetyl-CoA",
     "Citrate"
    ],
    "a": 2,
    "exp": "Phân tử mang gốc acetyl (2 carbon) liên kết với Coenzyme A là Acetyl-CoA chính là phân tử đi vào khởi đầu vòng quay của Chu trình Krebs."
   },
   {
    "n": 65,
    "q": "Chu trình Krebs còn có tên gọi khác là:",
    "o": [
     "Chu trình Calvin",
     "Chu trình Citric Acid",
     "Con đường C4",
     "Chu trình Glycolysis"
    ],
    "a": 1,
    "exp": "Chu trình Krebs còn được gọi là Chu trình Acid Citric (Citric Acid cycle) hoặc chu trình TCA (tricarboxylic acid cycle) theo tên chất trung gian 6 carbon đầu tiên được tạo ra."
   },
   {
    "n": 66,
    "q": "Chu trình Krebs diễn ra tại đâu trong tế bào nhân thực?",
    "o": [
     "Màng trong ti thể",
     "Chất nền ti thể",
     "Màng ngoài ti thể",
     "Tế bào chất"
    ],
    "a": 1,
    "exp": "Ở sinh vật nhân thực, toàn bộ các phản ứng enzyme của Chu trình Krebs diễn ra trong Chất nền ti thể (Matrix)."
   },
   {
    "n": 67,
    "q": "Trong Chu trình Krebs, Acetyl-CoA (2C) kết hợp với Oxaloacetate (4C) để tạo thành phân tử chứa 6 carbon là:",
    "o": [
     "Pyruvate",
     "Citrate (Citric acid)",
     "Lactate",
     "RuBP"
    ],
    "a": 1,
    "exp": "Trong phản ứng mở đầu chu trình Krebs, nhóm acetyl (2C) từ Acetyl-CoA kết hợp với Oxaloacetate (4C) tạo thành phân tử Citrate (Citric acid mang 6C)."
   },
   {
    "n": 68,
    "q": "Với mỗi phân tử Glucose (tương ứng 2 vòng quay của chu trình Krebs), sản phẩm thu được gồm:",
    "o": [
     "2 CO<sub>2</sub>, 2 ATP, 2 NADH, 2 FADH<sub>2</sub>",
     "4 CO<sub>2</sub>, 2 ATP (hoặc GTP), 6 NADH, 2 FADH<sub>2</sub>",
     "6 CO<sub>2</sub>, 32 ATP",
     "2 Pyruvate, 4 ATP, 2 NADH"
    ],
    "a": 1,
    "exp": "Mỗi phân tử glucose tạo ra 2 phân tử Acetyl-CoA, tương ứng với 2 vòng quay chu trình Krebs, tạo ra tổng cộng: 4 CO2, 2 ATP (hoặc GTP), 6 NADH và 2 FADH2."
   },
   {
    "n": 69,
    "q": "Phần lớn năng lượng giải phóng từ Glucose sau khi kết thúc chu trình Krebs được lưu giữ trong các phân tử:",
    "o": [
     "ATP",
     "CO<sub>2</sub>",
     "NADH và FADH<sub>2</sub>",
     "Water (H<sub>2</sub>O)"
    ],
    "a": 2,
    "exp": "Sau khi kết thúc chu trình Krebs, phần lớn năng lượng hóa học ban đầu của glucose được bảo tồn và lưu giữ dưới dạng các electron giàu năng lượng trong các phân tử chất mang NADH và FADH2."
   },
   {
    "n": 70,
    "q": "Toàn bộ lượng CO<sub>2</sub> giải phóng ra trong hô hấp tế bào xuất phát từ các giai đoạn nào?",
    "o": [
     "Đường phân và Chu trình Krebs",
     "Oxi hóa Pyruvate và Chu trình Krebs",
     "Chuỗi truyền electron và Thẩm thấu hóa học",
     "Đường phân và Chuỗi truyền electron"
    ],
    "a": 1,
    "exp": "Toàn bộ 6 phân tử CO2 thải ra trong hô hấp tế bào đều xuất phát từ hai giai đoạn: giai đoạn Oxy hóa Pyruvate (thải 2 CO2) và Chu trình Krebs (thải 4 CO2); đường phân hoàn toàn không giải phóng CO2."
   },
   {
    "n": 71,
    "q": "Chuỗi truyền electron hô hấp nằm ở vị trí nào của ti thể?",
    "o": [
     "Chất nền ti thể",
     "Màng ngoài ti thể",
     "Màng trong ti thể (Mào ti thể / Cristae)",
     "Khoảng không giữa hai màng"
    ],
    "a": 2,
    "exp": "Chuỗi truyền electron hô hấp (ETC) gồm hàng loạt các phức hợp protein xuyên màng gắn định vị trên Màng trong ti thể (đặc biệt tại các nếp gấp gờ mào Cristae)."
   },
   {
    "n": 72,
    "q": "Vai trò chính của các NADH và FADH<sub>2</sub> trong hô hấp tế bào là:",
    "o": [
     "Cung cấp Carbon cho chu trình Krebs",
     "Cung cấp electron và proton cho chuỗi truyền electron",
     "Trực tiếp thủy phân ATP",
     "Bơm CO<sub>2</sub> ra ngoài tế bào"
    ],
    "a": 1,
    "exp": "Các phân tử NADH và FADH2 đóng vai trò là các 'con thoi mang điện tử': chúng chuyển giao các electron giàu năng lượng và proton H+ cho chuỗi truyền electron."
   },
   {
    "n": 73,
    "q": "Chất nhận electron cuối cùng trong chuỗi truyền electron của hô hấp hiếu khí là:",
    "o": [
     "NAD<sup>+</sup>",
     "Pyruvate",
     "O<sub>2</sub>",
     "CO<sub>2</sub>"
    ],
    "a": 2,
    "exp": "Oxygen (O2) là chất nhận electron cuối cùng trong chuỗi truyền electron hô hấp; do có độ âm điện rất lớn, O2 kéo dòng electron di chuyển liên tục dọc theo chuỗi."
   },
   {
    "n": 74,
    "q": "Khi O<sub>2</sub> nhận electron và proton (H<sup>+</sup>) ở cuối chuỗi truyền electron, sản phẩm được tạo thành là:",
    "o": [
     "CO<sub>2</sub>",
     "H<sub>2</sub>O",
     "ATP",
     "Glucose"
    ],
    "a": 1,
    "exp": "Ở cuối chuỗi truyền electron, mỗi nguyên tử oxy nhận 2 electron và kết hợp với 2 proton H+ từ chất nền ti thể để tạo thành phân tử Nước (H2O: 1/2 O2 + 2 e- + 2 H+ -> H2O)."
   },
   {
    "n": 75,
    "q": "Chuỗi truyền electron vận chuyển electron qua một dãy các phức hợp protein để làm gì?",
    "o": [
     "Bơm H<sup>+</sup> từ chất nền ti thể ra khoảng giữa hai màng ti thể",
     "Tổng hợp trực tiếp Glucose",
     "Phân hủy ATP thành ADP",
     "Bơm CO<sub>2</sub> vào chất nền"
    ],
    "a": 0,
    "exp": "Khi các electron di chuyển dọc theo chuỗi truyền electron, năng lượng giải phóng từ dòng electron được các phức hợp protein dùng để bơm proton H+ từ chất nền ti thể ra Xoang gian màng (khoảng giữa hai màng ti thể)."
   },
   {
    "n": 76,
    "q": "Sự chênh lệch nồng độ H<sup>+</sup> giữa khoảng gian màng và chất nền ti thể tạo ra:",
    "o": [
     "Áp suất thẩm thấu giảm",
     "Lực động lực proton (Proton-motive force)",
     "Nhiệt độ cực cao",
     "Sự phân hủy màng ti thể"
    ],
    "a": 1,
    "exp": "Sự tích lũy H+ ở xoang gian màng tạo nên sự chênh lệch lớn về pH và điện thế qua màng trong ti thể, hình thành nên Lực động lực proton (Proton-motive force)."
   },
   {
    "n": 77,
    "q": "Enzyme trực tiếp tổng hợp ATP nhờ dòng chảy khuếch tán của H<sup>+</sup> quay trở lại chất nền ti thể là:",
    "o": [
     "Rubisco",
     "Pyruvate dehydrogenase",
     "ATP synthase",
     "Amylase"
    ],
    "a": 2,
    "exp": "ATP synthase là phức hệ enzyme hình tua-bin xuyên màng trong ti thể; nó tận dụng năng lượng từ dòng proton H+ khuếch tán xuôi dốc trở lại chất nền để quay trục và gắn phosphate tổng hợp nên ATP."
   },
   {
    "n": 78,
    "q": "Quá trình tổng hợp ATP nhờ năng lượng từ dòng khuếch tán H<sup>+</sup> qua ATP synthase được gọi là:",
    "o": [
     "Thẩm thấu hóa học (Chemiosmosis)",
     "Đường phân",
     "Lên men",
     "Phosphoryl hóa cấp cơ chất"
    ],
    "a": 0,
    "exp": "Thẩm thấu hóa học (Chemiosmosis) là cơ chế liên hợp năng lượng: dòng ion H+ khuếch tán qua kênh ATP synthase thúc đẩy sự tổng hợp ATP từ ADP và Pi."
   },
   {
    "n": 79,
    "q": "Giai đoạn nào tạo ra số lượng ATP nhiều nhất trong hô hấp tế bào?",
    "o": [
     "Đường phân",
     "Oxi hóa Pyruvate",
     "Chu trình Krebs",
     "Phosphoryl hóa oxy hóa (Chuỗi truyền electron & Thẩm thấu hóa học)"
    ],
    "a": 3,
    "exp": "Giai đoạn Phosphoryl hóa oxy hóa (kết hợp Chuỗi truyền electron và Thẩm thấu hóa học) tạo ra số lượng ATP áp đảo nhất trong toàn bộ quá trình hô hấp tế bào (~26 đến 28 ATP trong tổng số ~32 ATP)."
   },
   {
    "n": 80,
    "q": "Ước tính 1 phân tử NADH khi đi qua chuỗi truyền electron tạo ra khoảng bao nhiêu ATP?",
    "o": [
     "1 ATP",
     "1.5 ATP",
     "2.5 ATP (hoặc 3 ATP)",
     "10 ATP"
    ],
    "a": 2,
    "exp": "Theo tính toán hóa sinh học hiện đại, mỗi phân tử NADH chuyển electron vào đầu chuỗi ETC sẽ bơm đủ proton để tổng hợp trung bình khoảng 2.5 ATP (hoặc xấp xỉ 3 ATP theo quy ước cũ)."
   },
   {
    "n": 81,
    "q": "Ước tính 1 phân tử FADH<sub>2</sub> khi đi qua chuỗi truyền electron tạo ra khoảng bao nhiêu ATP?",
    "o": [
     "1.5 ATP (hoặc 2 ATP)",
     "2.5 ATP",
     "3.5 ATP",
     "4 ATP"
    ],
    "a": 0,
    "exp": "FADH2 nhường electron ở phức hệ II (vị trí thấp hơn NADH) nên bơm được ít proton hơn, do đó mỗi FADH2 chỉ tạo ra trung bình khoảng 1.5 ATP (hoặc xấp xỉ 2 ATP theo quy ước cũ)."
   },
   {
    "n": 82,
    "q": "Tổng số phân tử ATP thu được tối đa từ phân giải hoàn toàn 1 phân tử Glucose qua hô hấp hiếu khí khoảng:",
    "o": [
     "2 ATP",
     "4 ATP",
     "30 - 32 ATP (hoặc 36 - 38 ATP tùy tế bào)",
     "100 ATP"
    ],
    "a": 2,
    "exp": "Tổng kết lại, từ 1 phân tử Glucose được phân giải hoàn toàn qua hô hấp tế bào hiếu khí, tế bào thu được tối đa khoảng 30 đến 32 phân tử ATP (dao động 36 - 38 ATP ở một số loại mô/tế bào)."
   },
   {
    "n": 83,
    "q": "Trong điều kiện thiếu O<sub>2</sub> (yếm khí), tế bào nhân thực sẽ duy trì sản xuất ATP bằng con đường:",
    "o": [
     "Chu trình Krebs",
     "Lên men (Fermentation)",
     "Thẩm thấu hóa học",
     "Ngừng hoàn toàn hoạt động"
    ],
    "a": 1,
    "exp": "Khi môi trường cạn kiệt O2, chuỗi truyền electron ngừng trệ; tế bào chuyển sang con đường Lên men (Fermentation) trong tế bào chất để duy trì sản xuất ATP cấp bách."
   },
   {
    "n": 84,
    "q": "Mục đích cốt lõi của quá trình lên men là:",
    "o": [
     "Tái tạo NAD<sup>+</sup> từ NADH để duy trì giai đoạn Đường phân",
     "Tạo ra nhiều ATP hơn hô hấp hiếu khí",
     "Giải phóng thêm O<sub>2</sub> cho tế bào",
     "Tổng hợp Glucose từ Pyruvate"
    ],
    "a": 0,
    "exp": "Mục đích cốt lõi sống còn của lên men là chuyển electron từ NADH sang pyruvate hoặc dẫn xuất của nó nhằm tái sinh coenzyme oxy hóa NAD+ để chu trình Đường phân có thể tiếp tục diễn ra."
   },
   {
    "n": 85,
    "q": "Quá trình lên men diễn ra ở đâu?",
    "o": [
     "Màng trong ti thể",
     "Tế bào chất",
     "Chất nền ti thể",
     "Lưới nội chất"
    ],
    "a": 1,
    "exp": "Toàn bộ các phản ứng của quá trình lên men (gồm đường phân và bước khử pyruvate tái sinh NAD+) diễn ra hoàn toàn trong Tế bào chất (bào tương), không liên quan đến ti thể."
   },
   {
    "n": 86,
    "q": "Số lượng ATP thu được ròng từ 1 phân tử Glucose qua quá trình Lên men là:",
    "o": [
     "2 ATP",
     "4 ATP",
     "32 ATP",
     "0 ATP"
    ],
    "a": 0,
    "exp": "Quá trình lên men chỉ thu được năng lượng từ bước đường phân, do đó hiệu suất năng lượng ròng chỉ đạt đúng 2 ATP trên mỗi phân tử Glucose bị phân giải."
   },
   {
    "n": 87,
    "q": "Lên men Lactic acid xảy ra ở sinh vật/tế bào nào sau đây khi thiếu oxygen?",
    "o": [
     "Nấm men bánh mì",
     "Tế bào cơ bắp người khi vận động mạnh",
     "Tế bào lá cây",
     "Tế bào thần kinh"
    ],
    "a": 1,
    "exp": "Lên men Lactic acid (Lactate fermentation) xảy ra phổ biến ở các tế bào cơ xương của người và động vật khi vận động cơ bắp cường độ cao khiến cung cấp O2 không kịp nhu cầu."
   },
   {
    "n": 88,
    "q": "Sản phẩm của lên men Lactic acid là:",
    "o": [
     "Ethanol và CO<sub>2</sub>",
     "Lactic acid (Lactate)",
     "Acetyl-CoA và CO<sub>2</sub>",
     "Citrate"
    ],
    "a": 1,
    "exp": "Trong lên men lactic acid, pyruvate nhận trực tiếp electron từ NADH để tạo thành Lactic acid (Lactate); phản ứng này không giải phóng khí CO2."
   },
   {
    "n": 89,
    "q": "Sản phẩm của lên men Rượu (Alcohol/Ethanol fermentation) ở nấm men bao gồm:",
    "o": [
     "Lactic acid và ATP",
     "Ethanol, CO<sub>2</sub> và ATP",
     "Pyruvate và H<sub>2</sub>O",
     "Acetyl-CoA và O<sub>2</sub>"
    ],
    "a": 1,
    "exp": "Lên men rượu (Alcohol fermentation) ở nấm men chuyển hóa pyruvate qua hai bước: trước hết giải phóng CO2 tạo acetaldehyde, sau đó khử thành Ethanol (rượu etylic), đồng thời tạo ATP."
   },
   {
    "n": 90,
    "q": "Khí nào gây ra các lỗ rỗng trong ruột bánh mì và bọt khí trong bia/rượu vang?",
    "o": [
     "O<sub>2</sub>",
     "CO<sub>2</sub>",
     "N<sub>2</sub>",
     "CH<sub>4</sub>"
    ],
    "a": 1,
    "exp": "Khí CO2 thoát ra trong quá trình lên men rượu của nấm men làm bột bánh mì nở phồng xốp tạo thành các lỗ rỗng trong ruột bánh, đồng thời tạo bọt ga sủi tăm trong bia và rượu vang sủi."
   },
   {
    "n": 91,
    "q": "Sinh vật kị khí bắt buộc (Obligate anaerobes):",
    "o": [
     "Chỉ sống được khi có O<sub>2</sub>",
     "Không thể sống/bị độc hại trong môi trường có O<sub>2</sub>",
     "Có thể dùng hoặc không dùng O<sub>2</sub>",
     "Không cần năng lượng ATP"
    ],
    "a": 1,
    "exp": "Sinh vật kị khí bắt buộc (Obligate anaerobes) chỉ có thể sống bằng lên men hoặc hô hấp kị khí; chúng không có enzyme giải độc oxy (như catalase, SOD) nên oxy phân tử là chất độc gây chết đối với chúng."
   },
   {
    "n": 92,
    "q": "Sinh vật kị khí tùy tiện (Facultative anaerobes) như nấm men hay vi khuẩn:",
    "o": [
     "Chỉ lên men khi có O<sub>2</sub>",
     "Có thể tồn tại bằng cả hô hấp hiếu khí (khi có O<sub>2</sub>) hoặc lên men (khi thiếu O<sub>2</sub>)",
     "Bị chết ngay lập tức nếu gặp O<sub>2</sub>",
     "Không thực hiện được đường phân"
    ],
    "a": 1,
    "exp": "Sinh vật kị khí tùy tiện (Facultative anaerobes - như nấm men bánh mì, vi khuẩn đường ruột E. coli) có khả năng linh hoạt: sống bằng hô hấp hiếu khí khi có O2, và tự động chuyển sang lên men khi môi trường thiếu O2."
   },
   {
    "n": 93,
    "q": "Sự khác biệt cơ bản giữa Hô hấp kị khí (Anaerobic respiration) và Lên men (Fermentation) là:",
    "o": [
     "Hô hấp kị khí vẫn có chuỗi truyền electron với chất nhận e cuối cùng không phải là O<sub>2</sub> (ví dụ: SO<sub>4</sub><sup>2-</sup>), còn lên men không có chuỗi truyền electron",
     "Lên men tạo ra nhiều ATP hơn",
     "Hô hấp kị khí cần O<sub>2</sub>",
     "Lên men xảy ra trong ti thể"
    ],
    "a": 0,
    "exp": "Hô hấp kị khí (Anaerobic respiration) vẫn có chuỗi truyền electron hoàn chỉnh nhưng chất nhận electron cuối cùng là chất vô cơ khác O2 (như ion Sulfate SO4(2-), Nitrate NO3(-)), còn Lên men hoàn toàn không sử dụng chuỗi truyền electron."
   },
   {
    "n": 94,
    "q": "Chất nào sau đây KHÔNG PHẢI là nguyên liệu có thể đưa vào các con đường dị hóa để tạo ATP?",
    "o": [
     "Carbohydrate (Đường)",
     "Lipid (Chất béo)",
     "Protein",
     "Khí Argon"
    ],
    "a": 3,
    "exp": "Khí Argon là khí hiếm trơ về mặt hóa học, hoàn toàn không tham gia vào bất kỳ phản ứng chuyển hóa tế bào nào để sinh năng lượng (Carbohydrate, Lipid và Protein đều phân giải tạo ATP được)."
   },
   {
    "n": 95,
    "q": "Chất béo (Lipid) được phân giải thành Glycerol và Fatty acid; Fatty acid đi vào hô hấp tế bào dưới dạng Acetyl-CoA thông qua quá trình:",
    "o": [
     "Oxi hóa Beta (β-oxidation)",
     "Đường phân",
     "Thẩm thấu",
     "Lên men Lactic"
    ],
    "a": 0,
    "exp": "Các phân tử acid béo trong lipid được phân giải qua quá trình Oxy hóa Beta (Beta-oxidation) thành các mảnh 2-carbon Acetyl-CoA để đi thẳng vào Chu trình Krebs sinh ATP."
   },
   {
    "n": 96,
    "q": "Ức chế ngược (Feedback inhibition) trong điều hòa trao đổi chất là hiện tượng:",
    "o": [
     "Sản phẩm cuối cùng của con đường quay lại ức chế enzyme ở đầu con đường",
     "Cơ chất kích thích tăng tốc phản ứng",
     "ATP phân hủy làm dừng hô hấp",
     "Enzyme bị phá hủy vĩnh viễn"
    ],
    "a": 0,
    "exp": "Ức chế ngược (Feedback inhibition) là cơ chế điều hòa âm bản: nồng độ sản phẩm cuối cùng của một chuỗi chuyển hóa khi tích lũy quá cao sẽ liên kết vào trung tâm dị lập thể và ức chế enzyme xúc tác ở đầu chuỗi để tránh lãng phí nguyên liệu."
   },
   {
    "n": 97,
    "q": "Enzyme quan trọng đóng vai trò là \"van điều hòa\" (pacemaker) cho tốc độ của quá trình Đường phân là:",
    "o": [
     "ATP synthase",
     "Phosphofructokinase (PFK)",
     "Amylase",
     "DNA Polymerase"
    ],
    "a": 1,
    "exp": "Enzyme Phosphofructokinase (PFK) xúc tác bước 3 của đường phân là 'van điều hòa tốc độ' (pacemaker) chủ chốt, quyết định tế bào có tiếp tục đẩy nhanh hay làm chậm tốc độ phân giải đường."
   },
   {
    "n": 98,
    "q": "Khi nồng độ ATP trong tế bào quá cao, PFK sẽ bị:",
    "o": [
     "Kích thích hoạt động mạnh hơn",
     "Ức chế, làm chậm lại quá trình đường phân",
     "Biến đổi thành enzyme khác",
     "Phân hủy hoàn toàn"
    ],
    "a": 1,
    "exp": "Khi nồng độ ATP trong tế bào chất dồi dào, ATP hoạt động như một chất ức chế dị lập thể gắn vào PFK làm enzyme này giảm hoạt tính, từ đó làm chậm tốc độ đường phân tránh tạo năng lượng dư thừa."
   },
   {
    "n": 99,
    "q": "Điểm giống nhau giữa Đường phân và Lên men là:",
    "o": [
     "Đều diễn ra trong ti thể",
     "Đều không cần sự tham gia trực tiếp của O<sub>2</sub>",
     "Đều giải phóng CO<sub>2</sub>",
     "Đều tạo ra 32 ATP"
    ],
    "a": 1,
    "exp": "Cả Đường phân (Glycolysis) và Lên men (Fermentation) đều có đặc điểm chung là diễn ra trong tế bào chất và hoàn toàn không cần sự hiện diện trực tiếp của khí Oxygen (O2)."
   },
   {
    "n": 100,
    "q": "Sơ đồ tóm tắt nào phản ánh ĐÚNG dòng di chuyển của electron trong hô hấp hiếu khí?",
    "o": [
     "Glucose → NADH → Chuỗi truyền electron → O<sub>2</sub>",
     "O<sub>2</sub> → Chuỗi truyền electron → NADH → Glucose",
     "ATP → Glucose → NADH → CO<sub>2</sub>",
     "Glucose → Pyruvate → ATP → O<sub>2</sub>"
    ],
    "a": 0,
    "exp": "Dòng năng lượng và electron trong hô hấp hiếu khí di chuyển theo trật tự: Glucose (chất cho e giàu năng lượng) -> NADH (chất mang e) -> Chuỗi truyền electron ETC (sinh lực proton) -> O2 (chất nhận e cuối cùng)."
   }
  ]
 }
];
