# Cấu trúc thư mục của dự án

- Controller sẽ đóng vai trò là bộ xử lý logic của cái app của chúng ta -> Nên khai báo tên file với routes đồng bộ với nhau để nhìn vào cho nó có tổ chức.
- Thư mục middlewares sẽ là bộ tiền xử lý(bộ filter của app của server của chúng ta) -> Ví dụ như khi người ta đang nhập vào một cái app thì ngta phải nhập username và password thì chúng ta sẽ validate cái kiểu dữ liệu đầu vào, coi là email có đúng kí tự đúng định dạng hay không
- Model sẽ là nơi chứa hình thù của database mà chúng ta xây dựng (Ví dụ như là một cái collection thì nó sẽ có hình thù như thế nào) -> Thì trong model chúng ta sẽ khai báo một class hoặc là một cái interface gì đó tùy thuộc vào chúng ta(thường là sử dụng class)

- Thư mục service sẽ chứa những cái xử lý dưới database ví dụ như: email và password người dùng nhập vào có trùng khớp với database hay không nếu có thì sẽ trả về kết quả.
- Thằng controllers sẽ gọi đến service và service sẽ xử lý database gì đó và trả về cho controllers
- Sẽ có thêm một thư mục là `utils` -> Chứa các hàm tiện ích của chúng ta trong quá trình code

- Middlewares nó sẽ có 2 loại là `valiedate` và `Sanitize` , sanitize dùng để lọc dữ liệu ví dụ ng ười dùng gửi lên 5 trường dữ liệu nhưng ở dưới chúng ta chỉ nhận vào 2 trường dữ liệu nên là chúng ta sẽ lọc ra, còn Validate như đã biết là kiểm tra kiểu dữ liệu

  console.log(req.body) // Do thằng này trả về là undefined -> Do thằng này gửi server là kiểu JSON nên chúng ta phải parse nó ra thành kiểu object

- app.use(express.json()) là một middleware nên là nó phải chạy qua cái này thì nó mới chạy vào những cái route bên trong được
- Và những cái liên quan đến việc return kết quả trả về ở phần Route chúng ta sẽ đưa nó vào phần controllers

- Ở những video tiếp theo sẽ hướng dẫn trả error trực tiếp trong controllers luôn, thành công thì cũng trả trong cái controllers mà thất bại cũng trả trong controllers

## Kết nối với database mongodb

- Nên sử dụng class để kết nối với database, tập làm quen với điều đó để khi sau này qua nestjs sử dụng class rất là nhiều

## Khai báo các Route cho twitter

- // Trong đây sẽ khai báo các routes khác nhau của một app// Thằng nào đi qua cái Router này đều chạy cái function này
  // Khi mà sử dụng middleware thì chúng ta phải sử dụng cái next() để cho phép nó tới thằng tiếp theo sau cái middleware, nếu nó chạy đến đây mà chúng ta không có next() thì req nó sẽ dừng và nó không có chạy tiếp
  // Đây được gọi là middleware hay là handler cũng được trong đó có thể chứa nhiều cái handler

## Thiết kế user schema cho dự án Twitter

- Chúng ta sẽ dùng class để tạo ra schema cho user -> Khi mà dùng class thì nó vừa đại diện cho kiểu dữ liệu và vừa đai diện cho 1 cái object luôn -> Có thể lấy class đó tạo một cái object dựa trên cái class đó được

- Sau khi đã tạo được class `user` rồi , bây giờ làm sao để connnect tới database để `create` user -> Để lấy ra một cái instance database -> Nếu mà viết như -vậy thì cái db chỉ dùng được trong `function connect()` mà thôi

- Muốn share được db cho những method khác ở phía dưới thì chúng phải khai báo ở trên hàm class

- Geter và Seter là gì ->

  - Chúng là code constructs giúp các developer truy cập vào các thuộc tính của các objects một cách an toàn. Với getters, bạn có thể truy cập ('get') các giá trị của các thuộc tính từ mã bên ngoài, trong khi setters cho phép bạn thay đổi ('set') giá trị của chúng.

- Nếu mà đúng hơn thì thằng `get users() {}` type nó phải rõ ràng chứ không phải là `Collection<Document>` nên là ở đây sẽ sửa lại là `Collection<User>`
- process.env.DB_USERS_COLLECTION mình biết chắc nó là string nên là mình sẽ ép kiểu dữ liệu cho nó luôn

## Tạo RegisterController khi mà người dùng đăng kí thì chúng ta sẽ lưu dữ liệu vào bên trong database

- Mỗi khi đăng kí thig sẽ lấy collection users ra để thêm dữ liệu vào bên trong database và lưu trữ trong đó

- databaseService.users.insertOne({ email, password }) -> Nếu mà điền như vậy thì nó sẽ bị lỗi vì nó mong muốn các trường khác trong cái class nữa -> Vì thế tại soa chúng ta lại phải tạo 1 cái new class đó là lý do
- Nên chúng ta sẽ tạo ra cho nó một cái object và cái object này không có bất kì dữ liệu thừa nào hết vì nó tạo ra object giống y hệt những cái key mà chúng ta đã khai báo ở class `User` rồi

- Chúng ta muốn khi mà khởi tạo thì 2 thz `created_at` và `updated_at` sẽ bằng nhau về mặt thời gian
- Hàm insertOne trong mongodb là Promise nó sẽ return về một Promise<InsertOneResult<User>> -> Nên chúng ta phải await nó lại
- Do thằng finally sau khi kết nối xong thì nó await this.client.close() cái database của chúng ta đi
- Thường thì chúng ta sẽ tách cái users ra khỏi databaseService vào tạo thành userService để dễ quản lí

## JWT là gì

\*\*\* Trong đây là gì thì chúng ta sẽ được trình bày rõ:

- JWT là cơ chế xác thực người dùng được sử dụng phổ biến nhất hiện nay

- Chỉ server mới biết được secret_key tạo ra cái `signature` mà thôi -> Vì vậy thì chỉ có server mới có thể verify được cái jwt này do chính server tạo ra
- Do header và payload là ai cũng có thể đọc được nên đừng có lưu username hoặc là password vào `Header` hay là `Payload` -> Vì mặc định JWT sử dụng thuật toán HMACSHA256 nên nó có độ bảo mật rất là cao(và nó không thể làm giả được), một cái thuật toán càng cao cấp thì chúng ta giải mã nó rất là lâu

- Hiểu được JWT rồi thì chúng ta sẽ tìm hiểu sử dụng JWT vào việc xác thực người dùng

## AccessToken là gì

- Tìm Hiểu về accessToken mà thôi, nó sẽ giúp chúng ta xác thưc người
- Phương pháp mà người ta dùng token để xác thực như thế này được gọi là Token Based Authentication -> Không ai có thể làm giả được cái token JWT của bạn trừ khi họ biết cái secret_key của bạn, mà cái secret_key này chúng ta lưu trên server thì làm sao người ta biết được(trừ khi server chúng ta bị hack)
- Vì vậy chúng ta không cần lưu trữ JWT ở trên server nữa, chúng ta tạo ra và chúng ta gửi về cho client, chỉ cần client lưu trữ là được rồi -> Tiết kiệm được bộ nhớ cho server vì mỗi lần user gửi request lên server thì chúng ta chỉ cần verify thôi(nhanh hơn nhiều với cái bước vào database kiểm tra)
- Và cái token để xác thực người dùng có quyền truy cập vào tài nguyên hay không người ta gọi là `accessToken` -> accessToken người ta dụng đinh dạng phổ biến nhất của nó là JWT
- AccessToken nó sẽ tuân theo chuẩn 9068, tuy nhiên có thể thay đổi theo ý thích miễn sao là nó phù hợp với dự án
- Tùy từng trường hợp mà server có thể thêm các trường vào payload khi tạo access token, không cần cứng nhắc quá
- Flow xác thực người dùng với accessToken
  ++ Khi mà người dùng điền username và password lên server
  ++ Thì server sẽ bắt đầu kiểm tra xem có username và password hay không, nếu có thì server sẽ tạo JWT
  ++ JWT được kích hoạt và nó bắt đầu tạo ra accessToken và refreshToken
  ++ Gửi về cho client và client sẽ lưu JWT ở thiết bị(cookie, localStorage ,...)
  ++ User thực hiện các tác vụ sẽ gửi `request` và kèm với `JWT trong headers`
  ++ Server verify JWT của client bằng `secret_key` được lưu trên server (Và một điều lưu ý là token phải còn hạn sử dụng)
  ++ Nếu hợp lệ sẽ trả về tài nguyên tương ứng cho user

\*\* Vấn đề của accessToken

- Chúng ta không lưu accessToken ở server mà lưu ở client. Điều này được gọi là stateless(không trạng thái)
- Vì những hạn chế như vậy nên thường accessToken chỉ tồn tại được khoảng thời gian là 5p nên khi mà hacker có hack được accessToken nên cũng không có nhiều thời gian để đánh cắp những tài nguyên quan trọng => giảm thiểu rủi ro
- Nhưng cách này thì nó không hay lắm, vì nó làm cho người dùng bị logout và phải login sau mỗi 5p, rất khó chịu về trải nghiệm người dùng

- Lúc này người ta nghĩ ra 1 cách để giảm thiểu vấn đề trên, đó là sử dụng refreshToken -> Lúc này chúng ta sẽ tìm hiểu cơ chế của refreshToken.

## RefreshToken là gì

- RefreshToken là một chuỗi token khác, được tạo ra cùng lúc với AccessToken. RefreshToken có thời gian hiệu lực lâu hơn AccessToken, ví dụ như 1 tuần, 1 tháng, 1 năm...

\*\* Flow xác thực với accessToken và refreshToken sẽ được cập nhật như sau:

1. Client gửi request vào tài nguyên được bảo vệ trên server. Nếu client chưa được xác thực, server trả về lỗi 401 Unauthorization. Client gửi username và password của họ cho server.

2. Server xác minh thông tin xác thực được cung cấp so với cơ sở dữ liệu user. Nếu thông tin xác thực khớ, server tạo ra 2 JWT khác nhau là AccessToken và RefreshToken chứa payload là `user_id` (hoặc là trường nào đó định danh người dùng). AccessToken có thời gian ngắn(cỡ 5 phút).RefreshToken có thời gian dài hơn(cỡ 1 năm). RefreshToken sẽ được lưu vào cơ sở dữ liệu(statefull), còn AccessToken thì không(stateless).

3. Server trả về accessToken và refreshToken cho client

4. Client lưu trữ accessToken và refreshToken ở bộ nhớ thiết bị(cookie, localStorage , ...)

5. Đối với các yêu cầu tiếp theo, client gửi kèm accessToken trong header của request.

6. Server verify accessToken bằng secret_key để kiểm tra accessToken có hợp lệ không

7. Nếu hợp lệ, server cấp quyền truy cập vào tài nguyên được yêu cầu.

8. Khi accessToken hết hạn(bình thường sẽ không gửi refreshToken lên server chỉ khi nào accessToken hết hạn), client gửi refreshToken lên server để lấy accessToken(nên lúc này refreshToken mới được gọi là statefull vì có trạng thái người dùng).

9. Server kiểm tra refreshToken có hợp lệ hay không, có tồn tại trong cơ sở dữ liệu hay không. Nếu ok, server sẽ `xóa refreshToken cũ` và `tạo ra refreshToken mới với expire date như cũ` (ví dụ cái cũ hết hạn vào 5/10/2023 thì cái mới cũng hết hạn vào 5/10/2023) lưu vào cơ sở dữ liệu, tạo thêm accessToken mới.

10. Server trả về accessToken mới và refreshToken mới(refreshToken cũ không còn hiệu lực nữa) cho client.

11. Client lưu trữ accessToken và refreshToken mới ở bộ nhớ thiết bị(cookie, localStorage , ...).

12. Client có thể thực hiện các yêu cầu tiếp theo với accessToken mới(quá trình refreshToken sẽ diễn ra ngầm nên client sẽ không bị logout).

13. Khi người dùng muốn đăng xuất thì gọi API logout, server sẽ xóa refreshToken trong cơ sở dữ liệu, đồng thời client phải thực hiện xóa accessToken và refreshToken ở bộ nhớ thiết bị.

14. Khi refreshToken hết hạn(hoặc không hợp lệ) thì server se từ chối yêu cầu của client, client lúc này sẽ xóa accessToken và refreshToken ở bộ nhớ thiết bị và chuyển sang trạng thái logout(Ở bước này bắt buộc người dùng phải đăng nhập lại để có refreshToken mới).

\*\* Vấn đề bất cập giữa lý thuyết và thực tế

- Mong muốn của việc xác thực bằng JWT là stateless, nhưng ở trên chúng ta để ý mình lưu refreshToken vào trong cơ sở dữ liệu điều này làm cho server phải lưu trữ trạng thái của người dùng, tức là không còn stateless nữa.

- Chúng ta muốn bảo mật hơn thì chúng ta không thể cứng nhắc cứ stateless được, vậy nên kết hợp stateless và stateful có vẻ hợp lý hơn, accessToken thì stateless(DO accessToken người ta gọi thường xuyên luôn nên để stateless là hợp lý), còn refreshToken thì stateful(còn refreshToken chỉ khi accessToken hết hạn mới được gọi nên để trong database để đảm bảo tính bảo mật).

- Đây là lí do mình nói có sự mâu thuẫn giữa lý thuyết và thực tế áp dụng, khó mà áp dụng hoàn toàn stateless cho JWT trong thực tế được.

- Và có một số lý do nữa tại sao mình lưu refreshToken trong database đó là refreshToken thì có thời gian tồn tại rất lâu, nếu biết ai bị lộ refreshToken thì mình có thể xóa những cái refreshToken của user đó trong database, điều này sẽ làm cho hệ thống an toàn hơn.

- Tương tự nếu mình muốn logout một người dùng nào đó thì mình cũng có thể xóa refreshToken của người đó trong database. Sau khoản thời gian accessToken họ hết hạn thì họ thực hiện refresnToken sẽ không thành công và họ sẽ bị logout. Có điều là nó không tức thời, mà phải đợi đến khi accessToken hết hạn thì mới logout được.

- Chúng ta cũng có thể cải thiện thêm bằng cách cho thời gian hết hạn accessToken ngắn lại và dùng websocket để thông báo cho client logout ngay lập tức.

## Giải đáp thắc mắc về JWT

\*\* Tại sao chúng ta lại tạo refreshhToken mới khi chúng ta thực hiện refreshToken

- Phương pháp mà mỗi khi refreshToken được gọi thì nó sẽ tạo refreshToken(thời gian hết hạn của refreshToken vẫn giữ nguyên) mới thì được gọi refreshToken rotation .

\*\* Làm thế nào để thu hồi(revoke - vô hiệu hóa) được accessToken

- Access Token chúng ta thiết kế nó lá stateless, nên không có cách nào revoke nó ngay lập tức được `đúng nghĩa` được mà chúng ta phải chữa cháy thông qua websocket và revoke refreshToken.

- Còn nếu bạn muốn revoke ngay thì bạn phải lưu accessToken vào trong database, khi muốn revoke thì xóa nó trong database là được, nhưng điều này sẽ làm accessToken không còn stateless nữa.

\*\* Có khi nào có 2 JWT trùng nhau hay không?

- Có! Nếu payload và secret_key giống nhau thì 2 JWT sẽ giống nhau.

- Vậy nên nếu chúng ta tạo ra 2 JWT trong cùng một giây thì này trường `iat`(thời gian tạo ra JWT mặc định tính bằng giây) của 2 JWT này sẽ giống nhau, công với payload chúng tryền vào giống nhau nữa sẽ cho ra 2 JWT giống nhau.

\*\* Ở client thì nên lưu accessToken và refreshToken ở đâu?

- Nếu lưu ở cookie thì nó sẽ chiếm ưu thế hơn một chút về độ bảo mật cho accessToken và refreshToken

\*\* Gửi accessToken lên server nhu thế nào

- Sẽ có 2 trường hợp
  ++ Lưu cookie: nó sẽ tự động gửi mỗi khi request đến server, không cần quan tâm nó
  ++ Lưu ở localStorage: Các bạn thêm vào header với key là `Authorization` và giá trị là `Bearer <access_token>`

\*\* Tại sao phải thêm Bearer vào trước access token?

## Validate và Sanitize bằng Express Validator

- Sẽ thực hiện Validate và Sanitize, cài đặt express-validator, thì express-validator là một middleware giúp chúng ta validate dữ liệu từ `User` trả về cho người dùng

## Dùng checkSchema để valide body register

- Sẽ dùng checkSchema để validate body register?
- Thì ở những phiên bản trước thì cái thằng express-validator nó dùng những cái như {query, body} -> gọi là những validation chain để validate cho những model trong express -> Gần đây thì express-validtor nó có api là `Schema validation` để validate

- Thư viện express-validator thì nó là sự kết hợp của express.js và validator.js, nếu mà trong thư viện express-validator nó không rõ ràng thì vào thư viện validator.js để xem đầy đủ hơn

- Vừa dùng validator và Sanitize để lọc bỏ dấu cách(khoảng trắng trong tên)
- returnScore: true thì lúc nào nó cũng vượt qua độ manh của password cả,còn nếu để false thì sẽ biết được là thằng này có vượt qua được isStrongPassword hay không

- Chỉ cần check date_of_birth là `isISO8601` thì không cần check `isString` làm gì, tất nhiên là khi import RegisterValidator thì nó vẫn validate cho chúng ta nhưng nó vẫn chưa xuất lỗi ra cho chúng ta đâu chúng ta cần phải `handling error` nó nữa -> Chúng ta mong muốn là khi nó validate bị lỗi thì nó sẽ xuất lỗi ra luôn.

- Bên phần Running nó có hướng dẫn chúng ta tạo `validation runner`, do validationChain nó chỉ áp dụng được với `the validtion-chain` mà ở dây chúng ta lại dùng `checkSchema` nên không thể sử dụng do đó chúng ta phải custom lại

- Chúng ta bọc validate vào thằng RegisterValidator luôn để khi mà có lỗi thì nó sẽ chặn không cho cía luồng nó chạy vào RegisterController
- RegistetValidator nó sẽ có kiểu là RunnableValidationChains<ValidationChain> nhưng cụ thể thì nó sẽ có kiểu theo generic-type `validationChain`
- Do thằng RegisterValidator là Arrays vậy thì nó quá là ổn, Do validate là một cái function và nó return về một cái function nữa thì nó phù hợp với tiêu chí của method `POST` là params của nó là những `func Handler`

- Nếu đặt dữ liệu là `validations: ValidationChain[]` thì nó sẽ không có method `run()`, // Sau khi thực hiện validate rồi thì sẽ check cái lỗi gọi đến method là ValidationRequest, khi mà check lỗi xong thì nó sẽ đưa l-ỗi vào trong cái biến `req` và cái function `valiodationResult` giúp chúng ta lấy lỗi ra từ biến req

- Do chúng ta sử dụng method array() nên khi bị lỗi thì nó xuất hiện nhiều cái lỗi, nên ở đây chúng ta sẽ thay đổi lại là `mapped()`, chúng ta mượn custom lỗi thì chúng ta thêm cái errorMessage
- Chúng ta phải check thêm là độ dài confirm_password phải bằng độ dài password, nên ở đây chúng ta sẽ dùng cách để check nó -> Để check thêm điều đó thì chúng truyền props `optional` vào bên dưới những `props` khác -> custom validator nên return về một truthy nếu trường đó hợp lệ, còn return về falsy nếu trường đó ko hợp lệ, nếu là một một hàm bất đồng bộ nó có thì return về promise `resolve` nếu valid về `rejected` nếu invalid -> custom validator có tham số đầu tiên là `value` tham số thứ 2 là `object` có key là `req` `{ req , location, path}` -> Chúng ta sẽ lấy giá trị `confirm_password` ra để so sánh với `password`, giá trị confirm_password sẽ là `value` và password sẽ là `req.body.password`

- Thì validator nó sẽ check từ trên check xuống, nếu có một trường ko phù hợp thì nó sẽ show ra `message_error` tại trường đó

## Kiểm tra email có tồn tại hay không

- Kiểm tra là email có tồn tại hay không

// Nếu email trong db chính là cái value hiện tại, chấm then() nếu hành động bất đồng bộ `success`

- Có thể dùng thằng databaseService để check xem thằng email có tồn tại hay không hoặc có thể dùng UserService, nhưng tốt nhất nên tạo 1 hàm `checkEmail` trong `UserService`

## Tạo Access Token và Refresh Token

- Chúng ta muốn định nghĩa kiểu dữ liệu cho thằng body này thì làm cách nào ->
- Generic type thường sẽ khai báo kiểu dữ liệu chung cho những thằng con của một biến object cụ thể `req: Request<ParamsDictionary, any , any>`
- Mục đích của chúng ta là muốn lưu date_of_birth có kiểu là `Date`

- Bây giờ chúng ta sẽ tiến hành tạo `access_token` và `refresh_token` bởi vì cái flow chúng ta đăng kí thành công thì phải trả về `access_token` và `refresh_token`
- Và phần `password` mình sẽ dùng thuật toán `sha256` nằm trong thư viện crypto của nodejs để băm `password` ra rồi gửi lên server

- Nếu mà payload chúng ta truyền lên confirm password mà ở trong constructor() chúng ta không có khai báo `confirm_password` thì nó sẽ không nhận dư(cho dù có truyền dư dữ liệu vào), chỉ lấy những trường cần thiết mà thôi -> đó là một lợi thế/ công dụng của việc dùng `class` -> Nên là object tạo ra từ việc mình new User() nó chỉ có những cái data cần thiết cho thằng mongodb mà thôi

- Sử dụng jsonwebtoken và thuật toán là MHA Sha256(bất đồng bộ) để tạo ra access_token và refresh_token

- `secretOrPrivateKey` nó có thể là null, token mình chắc nó là string thì mình `as string` nó là được, nếu nó không phải là string thì nó sẽ không chạy đến đoạn resolve(token)
- Có thể khai báo PrivateKey cho access_token riêng và refresh_token riêng

- Tại vì khi mà mình truyền tham số mặc định vào trong hàm thì nó sẽ bắt buộc truyền các tham số trong hàm đó theo thứ tự, nếu vậy thì tham số mặc định không còn tác dụng -> Vì vậy chúng ta sẽ tryuền nó thành 1 cái object, cũng có thể đưa tham số `Private_key` ra sau cùng nhưng mà `ưu tiên dùng Object hơn`

- Sau khi đã xong thz signToken rồi thì chúng ta sẽ tạo `access_token` và `refresh_token` -> Sẽ dùng `signToken` để tạo ra `access_token`

  - Khai báo một private là signAccessToken để return về access_token
    ++ payload sẽ nhận vào là một user_id,
    ++ Và token của chúng ta chúng ta sẽ quy định thuộc tính nằm trong payload sẽ có tokenType

  - Sau khi đã insert vào database thì chúng ta thấy cái `result` chúng ta trả về một object có thuộc tính là `insertedId` nên chúng ta sẽ lấy ra cái `Id` đó -> Do insertedId có kiểu là `objectId` nên chúng ta sẽ convert nó sang string bằng `toString()` -> Do 2 thằng access_token và refresh_token đều là hàm async await nên chúng ta sẽ sử dụng Promise.all([]) để tối ưu perfomance
    -> Trước đó chúng ta có thể sử dụng việc xử lý đồng bộ để xử lý nhưng mà xử lý bất đồng bộ nó sẽ `tối ưu hiệu suất hơn` -> Do là chúng ta dùng Promise.All nên là 2 thằng access_token và refresh_token nó sẽ chạy song song -> Sau đó chúng ta sẽ return về access_token và refresh_token

  - Ngoài cái thời điểm khởi tạo chúng ta muốn quy định thêm thời điểm hết hạn nữa

- Cái formatOptions của thằng jwt sẽ như thế này -> Mặc định nếu người dùng truyền vào là number thì mặc định nó sẽ là s, còn nếu chúng ta ghi là '10h' thì nó sẽ là giờ, ghi là '10d' thì no sẽ là ngày hoặc là '10 days', còn nếu không ghi gì trong string '120' mặc định nó sẽ là `ms` -> Thằng expiresIn nó dùng theo cái tiêu chuẩn của thằng vercel/ms

-> Tóm lại trong phần này thì chúng ta sử dụng bất đồng bộ và chuyển nó thành Promise để tiện cho việc xử lý hơn, chúng ta dùng luôn resolve và reject chứ không nên dùng cái callback nó khá là khó để handle

## Error Handle trong Express.js

- Sau đây chúng ta sẽ đến với một tính năng rất là quan trọng trong bất kì cái framework nào đó chính là tính năng `Error Handling`

- Người dùng nhập liệu sai thì chúng ta cũng phải trả về lỗi , server vì một lí do gì đấy bị lỗi thì chúng ta cũng phải trả về lỗi
- Những cái controller của chúng ta điều được gọi là request handler,
- ExpressJS nó sẽ có `Error Handler` mặc định và mặc định nó trả về lỗi 500, Thường thì chúng ta sử dụng error trong những handler bth, nhưng mà hàm async func và callback async rất hay được sử dụng trong hành động bất đồng bộ -> Nên khi mà dùng async quăng đi một cái lỗi `throw new Error('Lỗi rồi bạn ơi')` thì nó sẽ không còn tác dụng nữa

  - Lưu ý rằng khi mà lỗi xảy ra trong một `Req Handler` thì thằng express nó sẽ tự động next() cho chúng ta, nhưng mà khi chúng ta dùng hàm `asyncFunc` thì nó sẽ không tự động `next()` cho chúng ta mà muốn next() thì chúng ta phải `try catch()` nó như sau:
    ++ async () {
    try { throw new Error('Lỗi rồi bạn ơi')} catch (error) { next(error) }
    }

    ++ Hoặc là có thể như này -> Promise.reject(new Error('Lỗi rồi bạn ơi')).catch(next)/((error) => next(error))

## Tạo wrapRequestHandler để xử lý lỗi

- Dùng kiến thức `Error Handling` đã học xử lý lỗi cho phần `Register` -> Vì vậy chúng ta nên tạo ra `wrapRequestHandler` để xử lý lỗi

- Mỗi khi mà Request handler mà chúng ta xử lý có lỗi gì đấy thì chúng ta nên next(error) để cho nó vào `Error Handler` để nó được xử lý trong đó, để cho `Error Handler` nó tập trung nó xử lý lỗi -> Chứ mà thằng `Request Handler` chỗ nào chúng ta cũng Response lỗi, nhiều chỗ như vậy thì nó cũng không hay, nó rất là khó để quản lí, chỉ nên xử lý lỗi tập trung tại một chỗ -> Những `Request Handler` nào có lỗi thì cứ `next(error)` dồn lại 1 chỗ xử lý lỗi

- Cái `Error Handler` trong video chỉ phục vụ cho route là '/register' mà thôi -> Để cho nó bị lỗi thì chúng ta chỉ cần throw new Error('Lỗi rồi') -> Chưa tối vì cái ErrorHandler chỉ xử lý cho thằng `register` mà thôi, chúng ta muốn nó tập trung xử lý cho cả cái app luôn

- Chúng ta sẽ khai báo một cái `Error Handler` file rồi gom những lỗi chúng vào trong đó -> Sẽ khai báo 1 cái middleware trong file `index.ts` là được
- Bây giờ quay trở lại thằng controllers, chẳng lẽ thằng controller nào chúng ta cũng `try - catch` hết hay sao, rồi mốt tới xử lý thằng `Login` cũng `try catch` lập lại liên tục như vậy

- Khi mà chúng ta xử lý nhiều async function thì chúng ta chỉ cần `try - catch` cái ngoài cùng là đủ rồi -> chúng ta không cần `try catch` bên trong nữa -> Nếu chúng ta try catch sai `try catch` không đúng thì thằng ngoài cùng nó không nhận được lỗi đâu

- Nên chúng ta sẽ tạo function để bọc lại những cái `controllers`
  try {}
  catch (error) {
  next(error)
  // console.log(Error)
  // return res.status(400).json({
  // message: 'Register failed'
  // })
  } + -> Lúc này không cần dùng try catch như này nữa

- Nếu có lỗi xảy ra với thằng controller thì nó sẽ nhảy vào `error handler` hàm `error handler` trong file index.ts nó được gọi là `Default error handler`
- Sau khi đã check chúng ta thấy rằng error có kiểu là `any`

- Await một function bth thì nó sẽ không lỗi(phần mềm phát triển), nhưng do ko thể await một function bình thường được nên là nó sẽ chạy xuống `catch` -> Chúng ta xem còn cách nào nữa không vì `try - catch` hơi nhiều dòng, muốn gọn hơn nữa -> Thì có thể làm như thế này Promise.resolve(func(req, res, next)).catch(next) như thế này cũng được -> cách này chúng ta cũng gọi cái func thôi nhưng mà gọi trong `Promise.resolve(func(req, res, next))`, chúng ta không quan trọng nó lỗi theo kiểu Promise.reject() hay là lỗi func bthuong,-> chi cần `func(req, res, next)` thì đoạn `Promise.resolve(func(req, res, next))` sẽ `reject` cho mình mà `reject` thì nó sẽ nhảy vào cái catch(next)
- Khi không dùng async thì nó vẫn lỗi -> Khi dùng async ở hàm `controllers` nếu có lỗi thì nó sẽ reject tại cái hàm đó cho chúng ta luôn `Promise.resolve(func(req, res, next))` khi `reject` thì nó sẽ nhảy đến ham catch(next) và trả về lỗi -> Chúng ta muốn khi không dùng async thì nó vẫn thực hiện được hàm Promise.resolve().catch

- Có lẻ khi mà chúng ta throw 1 cái Error trong `Promise.resolve(func(req, res , next))` thì nó không được -> Thôi thì đành sử dụng `try - catch` như bình thường vậy -> Cách `try catch` nó sẽ toàn năng hơn dùng cho cả func thường và func async

- Bây giờ những Controllers không cần phải dùng `try catch` block code nữa vì đã được bọc bởi `wrapRequestHandler` rồi

\*\* ++ -> Qua những video sao thì càng ngày chúng ta sẽ càng nâng cấp `Error Handler` lên

## Chuẩn hóa bộ xử lý lỗi

- Sẽ chuẩn hóa bộ xử lý lỗi

- Tiếp tục thiết kế hệ thống xử lý lỗi cho nó tường minh và rõ ràng hơn, ở đây thì cái app chúng ta nó còn nhiều vấn đề lắm

- Thằng middleware checkSchema đa số trường hợp chúng ta sẽ cho ra cái lỗi là 422(lỗi validate về form), nhưng mà sẽ có số trường hợp chúng ta sẽ cho ra lỗi không phải là 422,ví dụ như là chúng ta kiểm tra token của người ta, ngta không có gửi `token lên thì trả về lỗi 401` -> Vậy thì làm sao phân biệt được khi nào nên trả về `422` khi nào nên trả về `401`

- Thì đa số những kiểm tra như những trường trong registerValidator sẽ trả về lỗi 422, còn nếu chúng ta muốn chủ động trả về lỗi 401 , sở dĩ nó ra cái lỗi 422 là do cái middlewares `validate` chúng ta tự custom trả về status là `422` thì default lúc nào nó cũng trả về lỗi 422 -> Bây giờ mình mong muốn là khi mà email đã có người dki rồi thì mình trả về lỗi `401` thì phải có cách nào để middlewares `validate` nó nhận biết được

- Khi chúng ta quăng lỗi throw "Email already exists" và throw new Error('Email already exists') thì 2 thằng này tụi nó tương tự nhau, Chúng ta sẽ tạo ra message lỗi có dạng như sau `{ message: 'Email already exists'}`, cái Object này kiểu chúng ta sẽ cho một cái vòng loop, và nếu mình thấy cái `message nào nó có status khác 422` cho trả về cái error như này `{ message: 'Email already exists'}` bình thường cứ cho trả về error là 422

- Lỗi trả về cho người dùng thì chúng ta nên thống nhất format lỗi
- Nếu mà `msg.status !== 422` thì chúng ta sẽ cho nó xuất ra lỗi luôn còn bình thường thì chúng mới cho nó `next() để xử lý lỗi liên quan đến 422`

\*\*
++ Lỗi thường

```ts
{
  message: string
  error_info?: any
}
```

++ Lỗi Validation (422) -> thường là do submit cái `form` những cái trường trong form nó bị sai hay thiếu sốt gì đó thì ta trả về 422

```ts
{
  message: string
  errors: {
    [field: string]: {
      message: string
      location: string
      value: any
    }
  }
}

- message chỉ nên là string thôi không nên để object
```

- Bình thường khi mà tạo class ErrorStatus thì sẽ cho nó kế thừa từ `StackKey` để mà biết được thông tin lỗi ở dòng nào nhưng ở đây chúng ta sẽ không cho nó kế thừa -> Tạo hàm ErrorWithStatus và đem qua ô middleware users để thay thế -> Nếu như mà mình extends thằng `Error` từ thằng js thì chúng ta phải super(message)
  ++ Nếu mà chúng ta throw một cái object lỗi được kế thừa Error(hàm của javascript `Error(object)`) thì nó chỉ nhận mỗi message của `Error object` mà thôi khi mà thằng `validationResult` thì thằng object trả về lỗi trong `user middlewares` nó sẽ thu gọn object của chúng ta chỉ còn lại mỗi `Message: string` -> Đó là lý do mà chúng ta không dùng thằng `Error của javascript`, dùng thì nó sẽ hay hơn nhưng mà dùng thì nó sẽ bị dính thư viện `express-validator`

- Mục đích của việc nhận đầy đủ object lỗi trả về vì chúng ta sẽ dùng nó để chạy vòng lặp và chúng ta sẽ trả về lỗi theo đúng status lỗi của nó
- Setup function lỗi thì chúng ta phải làm cho nó tưởng minh -> msg instanceOf ErrorWithStatus && msg.status === 422

- Chúng ta sẽ không trả về Error trong thằng validation tất cả Error sẽ được xử lý ở `Default Error` -> Khi mà controllers của users route xử lý bị lỗi thì nó sẽ chạy xuống Middlewares `Default Error` để xử lý lỗi -> Lỗi lúc nào cũng trả ra 400 là do `middleware default error` chúng ta chưa có xử lý nó

- (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Lỗi là', err.message)
  res.status(404).json({ error: err.message })
  } -> Thay thế đoạn code này hàm xử lý riêng cho nó
  /

- `DefaultErrorHandler` chúng ta cần phải xử lý cái gì đó, cái params chúng ta muốn là khi mà có lỗi trả về có kiểu là một `objectError` có status bên trong -> Để mà chúng ta biết được response cái status về cho người dùng -> Nếu có lỗi thì chúng ta sẽ trả về cho người dùng còn không thì mặc định là `500` -> Mặc định sẽ trả về errorObject cho người dùng -> Ok khi check thì nó đã trả về lỗi status 401 rồi -> Việc trong server nó đã trả về status rồi nên việc trả về thêm status là điều không cần thiết -> Sẽ sử dụng omit để loại bỏ đi một cái thuộc tính của thằng object, cú pháp `omit(object, ['thuoctinh_delete'])`

- Còn với những lỗi 422 thì sao -> Tại vì mình chưa biết cái `errorObject` nó có thành phần gì trong này, bởi vì nó cũng có nhiều thứ, chúng ta muốn cho nó 1 cái khuông mẫu nhất định -> Sẽ tạo ra một cái `class ErrorEntity` nhất định cho nó -> Trong class Error sẽ có kiểu là một object có key là tên các trường và value sẽ chứa các thuộc tính mà nó trả về.
  ++ Record là type tiện ích của thằng typescript khi mà chúng ta khai báo như này Record<string, string> thì có nghĩa là nó là một object có key là string và value là string `{ [key: string]: string }`
  ++ Location trong object được hiểu là nó được gửi lên từ thành phần nào gửi lên cái Api(nằm ở body hay là ở query)

  ++ super({ message, status: HTTP_STATUS.UNPROCESSABLE_ENTITY }) // kế thừa nó từ thằng ErrorWStatus, message sẽ được kế thừa từ ErrorWithStatus, và message sẽ được truyền giá trị mặc định vào

- Chúng ta sẽ qua validation tạo một cái object tên là `entityErrors`, -> Ban đầu chúng ta sẽ cho thằng errors là một cái object rỗng -> Qua mỗi vòng lặp thì mình sẽ ép 1 cái thuộc tính vào trong thằng `errorsObject` này -> Nếu mà qua được vòng if thì nó là lỗi 422 bình thường

- Trong thằng express validator có cái api là Error Types các trường hợp lỗi khác nhau thì nó luôn trả về thuộc tính nhất định đó là `type` và `msg`, còn các giá trị lỗi còn lỗi nó còn phụ thuộc vào từng trường hợp lỗi là gì -> Nhưng ở đây chúng ta chỉ cần nhất là props `msg` nên ở đây chúng ta sẽ sửa lại giá trị lỗi cho nó , { msg: string, [key: string]: any } -> `msg` là string các `key` còn lại có giá trị là `any`.

- Người dùng ngta chỉ quan tâm đến là lỗi ở `trường - field` nào và `message` của lỗi đó là gì thôi, chứ ngta không quan tâm đến các props khác trong objectError -> Nên là chúng ta cần trả vè những thứ cần thiết cho người dùng mà thôi

## Khai báo message validation

- Khai báo message validation

- Chúng ta nên tạo ra những constants lỗi chứ đừng để lỗi đại như server trả về là `Invalid value` cho người dùng

## Xử lý logic login

- Xử lý logic login

## Cập nhật logic login và config env

- Cập nhật logic login và config env

## Access token middleware cho logout

- Access token và middleware cho logout

## Refresh token middleware và logout logic

- Refresh token middleware và logout logic
