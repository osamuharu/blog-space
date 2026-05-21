import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { AllConfigType } from './shared/types/config.type';

export default function setupSwagger(
  app: INestApplication,
  configService: ConfigService<AllConfigType>,
): { url: string } {
  const docName: string = configService.getOrThrow('app.name', { infer: true });
  const docDesc: string = 'Section for describe whole APIs';
  const docVersion: string = process.env.npm_package_version || '1.0.0';
  const docPrefix: string = 'docs';
  const apiPrefix: string = configService.getOrThrow('app.apiPrefix', {
    infer: true,
  });
  const headerLanguage = configService.getOrThrow('app.headerLanguage', {
    infer: true,
  });
  const fallbackLanguage = configService.getOrThrow('app.fallbackLanguage', {
    infer: true,
  });
  const url = `${apiPrefix}/${docPrefix}`;

  const documentBuild = new DocumentBuilder()
    .setTitle(docName)
    .setDescription(docDesc)
    .setVersion(docVersion)
    .addServer('/')
    .addGlobalParameters({
      in: 'header',
      required: false,
      name: headerLanguage,
      schema: {
        example: fallbackLanguage,
      },
    })
    .build();

  const document = SwaggerModule.createDocument(app, documentBuild, {
    deepScanRoutes: true,
  });

  SwaggerModule.setup(`${url}`, app, document, {
    jsonDocumentUrl: `${url}/json`, // Tạo đường dẫn /json để xem định dạng json
    yamlDocumentUrl: `${url}/yaml`, // Tạo đường dẫn /json để xem định dạng yaml
    explorer: true, // Bật thanh tìm kiếm
    customSiteTitle: docName,
    swaggerOptions: {
      docExpansion: 'none', // Thu gọn tất cả api lại.
      persistAuthorization: true, // Lưu các giá trị vào bộ nhớ tạm khi nhập token
      displayOperationId: true, // Hiện thị tên hàm trong Controller
      operationsSorter: 'method', // Cách sắp xếp các API bên trong một nhóm
      tagsSorter: 'alpha', // Sắp xếp các nhóm API theo bảng chữ cái (A-Z)
      tryItOutEnabled: true, // Nhấp nút "Try out" mới được test api
      filter: true, // Hiển thị một ô tìm kiếm (Filter) nhỏ xíu ngay phía trên danh sách API
      deepLinking: true, // Khi mở một API cụ thể, đường dẫn URL của trình duyệt sẽ tự động thay đổi
    },
  });

  return { url: `${apiPrefix}/${docPrefix}` };
}
